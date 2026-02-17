import { db } from "@white-shop/db";

class AdminOrdersService {
  /**
   * Get orders with filters and pagination
   */
  async getOrders(filters: {
    page?: number;
    limit?: number;
    status?: string;
    paymentStatus?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}) {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};

    // Build AND conditions array
    const andConditions: any[] = [];

    // Apply status filter
    if (filters.status) {
      andConditions.push({ status: filters.status });
    }

    // Apply payment status filter
    if (filters.paymentStatus) {
      andConditions.push({ paymentStatus: filters.paymentStatus });
    }

    // Apply search filter
    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.trim();
      andConditions.push({
        OR: [
          { number: { contains: searchTerm, mode: 'insensitive' } },
          { customerEmail: { contains: searchTerm, mode: 'insensitive' } },
          { customerPhone: { contains: searchTerm, mode: 'insensitive' } },
          {
            user: {
              OR: [
                { firstName: { contains: searchTerm, mode: 'insensitive' } },
                { lastName: { contains: searchTerm, mode: 'insensitive' } },
                { email: { contains: searchTerm, mode: 'insensitive' } },
                { phone: { contains: searchTerm, mode: 'insensitive' } },
              ],
            },
          },
        ],
      });
    }

    // Apply AND conditions if any exist
    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    // Determine sort field and order
    const sortBy = filters.sortBy || 'createdAt';
    const sortOrder = filters.sortOrder || 'desc';
    
    // Map frontend sort fields to database fields
    const sortFieldMap: Record<string, string> = {
      'total': 'total',
      'createdAt': 'createdAt',
    };
    
    const dbSortField = sortFieldMap[sortBy] || 'createdAt';
    const orderBy: any = { [dbSortField]: sortOrder };

    console.log('📦 [ADMIN SERVICE] getOrders with filters:', { where, page, limit, skip, orderBy });

    // Get orders with pagination, including related user for basic customer info
    const [orders, total] = await Promise.all([
      db.order.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          items: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
        },
      }),
      db.order.count({ where }),
    ]);

    // Format orders for response
    const formattedOrders = orders.map((order: { 
      id: string; 
      number: string; 
      status: string; 
      paymentStatus: string; 
      fulfillmentStatus: string; 
      total: number; 
      subtotal: number;
      discountAmount: number;
      shippingAmount: number;
      taxAmount: number;
      currency: string | null; 
      customerEmail: string | null; 
      customerPhone: string | null; 
      createdAt: Date;
      items: Array<unknown>;
      user?: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        phone: string | null;
      } | null;
    }) => {
      const customer = order.user || null;
      const firstName = customer?.firstName || '';
      const lastName = customer?.lastName || '';

      return {
        id: order.id,
        number: order.number,
        status: order.status,
        paymentStatus: order.paymentStatus,
        fulfillmentStatus: order.fulfillmentStatus,
        total: order.total,
        subtotal: order.subtotal,
        discountAmount: order.discountAmount,
        shippingAmount: order.shippingAmount,
        taxAmount: order.taxAmount,
        currency: order.currency || 'AMD',
        customerEmail: customer?.email || order.customerEmail || '',
        customerPhone: customer?.phone || order.customerPhone || '',
        customerFirstName: firstName,
        customerLastName: lastName,
        customerId: customer?.id || null,
        itemsCount: order.items.length,
        createdAt: order.createdAt.toISOString(),
      };
    });

    return {
      data: formattedOrders,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get single order by ID with full details for admin
   */
  async getOrderById(orderId: string) {
    // Fetch order with related user and items/variants/products
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            phone: true,
            firstName: true,
            lastName: true,
          },
        },
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: {
                    translations: {
                      where: { locale: "en" },
                      take: 1,
                    },
                  },
                },
                options: {
                  include: {
                    attributeValue: {
                      include: {
                        attribute: true,
                        translations: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        payments: true,
      },
    });

    if (!order) {
      throw {
        status: 404,
        type: "https://api.shop.am/problems/not-found",
        title: "Order not found",
        detail: `Order with id '${orderId}' does not exist`,
      };
    }

    const user = order.user as any;
    const items = Array.isArray(order.items) ? order.items : [];

    const formattedItems = items.map((item: any) => {
      const variant = item.variant;
      const product = variant?.product;
      const translations = Array.isArray(product?.translations)
        ? product.translations
        : [];
      const translation = translations[0] || null;

      const quantity = item.quantity ?? 0;
      const total = item.total ?? 0;
      const unitPrice =
        quantity > 0 ? Number((total / quantity).toFixed(2)) : total;

      // Extract variant options (color, size, etc.)
      // Support both new format (AttributeValue) and old format (attributeKey/value)
      const variantOptions = variant?.options?.map((opt: {
        attributeKey: string | null;
        value: string | null;
        valueId: string | null;
        attributeValue: {
          value: string;
          imageUrl: string | null;
          colors: any;
          translations: Array<{
            locale: string;
            label: string;
          }>;
          attribute: {
            key: string;
          };
        } | null;
      }) => {
        // Debug logging for each option
        console.log(`🔍 [ADMIN SERVICE] Processing option:`, {
          attributeKey: opt.attributeKey,
          value: opt.value,
          valueId: opt.valueId,
          hasAttributeValue: !!opt.attributeValue,
          attributeValueData: opt.attributeValue ? {
            value: opt.attributeValue.value,
            attributeKey: opt.attributeValue.attribute.key,
            imageUrl: opt.attributeValue.imageUrl,
            hasTranslations: opt.attributeValue.translations?.length > 0,
          } : null,
        });

        // New format: Use AttributeValue if available
        if (opt.attributeValue) {
          // Get label from translations (prefer current locale, fallback to first available)
          const translations = opt.attributeValue.translations || [];
          const label = translations.length > 0 ? translations[0].label : opt.attributeValue.value;
          
          return {
            attributeKey: opt.attributeValue.attribute.key || undefined,
            value: opt.attributeValue.value || undefined,
            label: label || undefined,
            imageUrl: opt.attributeValue.imageUrl || undefined,
            colors: opt.attributeValue.colors || undefined,
          };
        }
        // Old format: Use attributeKey and value directly
        return {
          attributeKey: opt.attributeKey || undefined,
          value: opt.value || undefined,
        };
      }) || [];

      console.log(`🔍 [ADMIN SERVICE] Item mapping:`, {
        productTitle: item.productTitle,
        variantId: item.variantId,
        hasVariant: !!variant,
        optionsCount: variant?.options?.length || 0,
        variantOptions,
      });

      return {
        id: item.id,
        variantId: item.variantId || variant?.id || null,
        productId: product?.id || null,
        productTitle: translation?.title || item.productTitle || "Unknown Product",
        sku: variant?.sku || item.sku || "N/A",
        quantity,
        total,
        unitPrice,
        variantOptions,
      };
    });

    const payments = Array.isArray(order.payments) ? order.payments : [];
    const primaryPayment = payments[0] || null;

    return {
      id: order.id,
      number: order.number,
      status: order.status,
      paymentStatus: order.paymentStatus,
      fulfillmentStatus: order.fulfillmentStatus,
      total: order.total,
      currency: order.currency || "AMD",
      totals: {
        subtotal: Number(order.subtotal || 0),
        discount: Number(order.discountAmount || 0),
        shipping: Number(order.shippingAmount || 0),
        tax: Number(order.taxAmount || 0),
        total: Number(order.total || 0),
        currency: order.currency || "AMD",
      },
      customerEmail: order.customerEmail || user?.email || undefined,
      customerPhone: order.customerPhone || user?.phone || undefined,
      billingAddress: order.billingAddress as any || null,
      shippingAddress: order.shippingAddress as any || null,
      shippingMethod: order.shippingMethod || null,
      notes: order.notes || null,
      adminNotes: order.adminNotes || null,
      ipAddress: order.ipAddress || null,
      userAgent: order.userAgent || null,
      payment: primaryPayment
        ? {
            id: primaryPayment.id,
            provider: primaryPayment.provider,
            method: primaryPayment.method,
            amount: primaryPayment.amount,
            currency: primaryPayment.currency,
            status: primaryPayment.status,
            cardLast4: primaryPayment.cardLast4,
            cardBrand: primaryPayment.cardBrand,
          }
        : null,
      customer: user
        ? {
            id: user.id,
            email: user.email,
            phone: user.phone,
            firstName: user.firstName,
            lastName: user.lastName,
          }
        : null,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt?.toISOString?.() ?? undefined,
      items: formattedItems,
    };
  }

  /**
   * Delete order
   * Հեռացնում է պատվերը և բոլոր կապված գրառումները (cascade)
   */
  async deleteOrder(orderId: string) {
    try {
      console.log('🗑️ [ADMIN] Սկսվում է պատվերի հեռացում:', {
        orderId,
        timestamp: new Date().toISOString(),
      });
      
      // Ստուգում ենք, արդյոք պատվերը գոյություն ունի
      console.log('🔍 [ADMIN] Ստուգվում է պատվերի գոյությունը...');
      const existing = await db.order.findUnique({
        where: { id: orderId },
        select: {
          id: true,
          number: true,
          status: true,
          total: true,
          _count: {
            select: {
              items: true,
              payments: true,
              events: true,
            },
          },
        },
      });

      if (!existing) {
        console.log('❌ [ADMIN] Պատվերը չի գտնվել:', orderId);
        throw {
          status: 404,
          type: "https://api.shop.am/problems/not-found",
          title: "Order not found",
          detail: `Order with id '${orderId}' does not exist`,
        };
      }

      console.log('✅ [ADMIN] Պատվերը գտնվել է:', {
        id: existing.id,
        number: existing.number,
        status: existing.status,
        total: existing.total,
        itemsCount: existing._count.items,
        paymentsCount: existing._count.payments,
        eventsCount: existing._count.events,
      });

      // Հեռացնում ենք պատվերը (cascade-ը ավտոմատ կհեռացնի կապված items, payments, events)
      console.log('🗑️ [ADMIN] Հեռացվում է պատվերը և կապված գրառումները...');
      
      try {
        await db.order.delete({
          where: { id: orderId },
        });
        console.log('✅ [ADMIN] Prisma delete հարցումը հաջողությամբ ավարտված');
      } catch (deleteError: any) {
        console.error('❌ [ADMIN] Prisma delete սխալ:', {
          code: deleteError?.code,
          meta: deleteError?.meta,
          message: deleteError?.message,
          name: deleteError?.name,
        });
        throw deleteError;
      }

      console.log('✅ [ADMIN] Պատվերը հաջողությամբ հեռացվել է:', {
        orderId,
        orderNumber: existing.number,
        timestamp: new Date().toISOString(),
      });
      
      return { success: true };
    } catch (error: any) {
      // Եթե սա մեր ստեղծած սխալ է, ապա վերադարձնում ենք այն
      if (error.status && error.type) {
        console.error('❌ [ADMIN] Ստանդարտ սխալ:', {
          status: error.status,
          type: error.type,
          title: error.title,
          detail: error.detail,
        });
        throw error;
      }

      // Մանրամասն լոգավորում Prisma սխալների համար
      console.error('❌ [ADMIN] Պատվերի հեռացման սխալ:', {
        orderId,
        error: {
          name: error?.name,
          message: error?.message,
          code: error?.code,
          meta: error?.meta,
          stack: error?.stack?.substring(0, 500),
        },
        timestamp: new Date().toISOString(),
      });

      // Prisma սխալների մշակում
      if (error?.code === 'P2025') {
        // Record not found
        console.log('⚠️ [ADMIN] Prisma P2025: Գրառումը չի գտնվել');
        throw {
          status: 404,
          type: "https://api.shop.am/problems/not-found",
          title: "Order not found",
          detail: `Order with id '${orderId}' does not exist`,
        };
      }

      if (error?.code === 'P2003') {
        // Foreign key constraint failed
        console.log('⚠️ [ADMIN] Prisma P2003: Foreign key սահմանափակում');
        throw {
          status: 409,
          type: "https://api.shop.am/problems/conflict",
          title: "Cannot delete order",
          detail: "Order has related records that cannot be deleted",
        };
      }

      // Գեներիկ սխալ
      throw {
        status: 500,
        type: "https://api.shop.am/problems/internal-error",
        title: "Internal Server Error",
        detail: error?.message || "Failed to delete order",
      };
    }
  }

  /**
   * Update order
   */
  async updateOrder(orderId: string, data: any) {
    try {
      // Check if order exists
      const existing = await db.order.findUnique({
        where: { id: orderId },
      });

      if (!existing) {
        throw {
          status: 404,
          type: "https://api.shop.am/problems/not-found",
          title: "Order not found",
          detail: `Order with id '${orderId}' does not exist`,
        };
      }

      // Validate status values
      const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
      const validPaymentStatuses = ['pending', 'paid', 'failed', 'refunded'];
      const validFulfillmentStatuses = ['unfulfilled', 'fulfilled', 'shipped', 'delivered'];

      if (data.status !== undefined && !validStatuses.includes(data.status)) {
        throw {
          status: 400,
          type: "https://api.shop.am/problems/validation-error",
          title: "Validation Error",
          detail: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
        };
      }

      if (data.paymentStatus !== undefined && !validPaymentStatuses.includes(data.paymentStatus)) {
        throw {
          status: 400,
          type: "https://api.shop.am/problems/validation-error",
          title: "Validation Error",
          detail: `Invalid paymentStatus. Must be one of: ${validPaymentStatuses.join(', ')}`,
        };
      }

      if (data.fulfillmentStatus !== undefined && !validFulfillmentStatuses.includes(data.fulfillmentStatus)) {
        throw {
          status: 400,
          type: "https://api.shop.am/problems/validation-error",
          title: "Validation Error",
          detail: `Invalid fulfillmentStatus. Must be one of: ${validFulfillmentStatuses.join(', ')}`,
        };
      }

      // Prepare update data
      const updateData: any = {};
      if (data.status !== undefined) updateData.status = data.status;
      if (data.paymentStatus !== undefined) updateData.paymentStatus = data.paymentStatus;
      if (data.fulfillmentStatus !== undefined) updateData.fulfillmentStatus = data.fulfillmentStatus;

      // Update timestamps based on status changes
      if (data.status === 'completed' && existing.status !== 'completed') {
        updateData.fulfilledAt = new Date();
      }
      if (data.status === 'cancelled' && existing.status !== 'cancelled') {
        updateData.cancelledAt = new Date();
      }
      if (data.paymentStatus === 'paid' && existing.paymentStatus !== 'paid') {
        updateData.paidAt = new Date();
      }

      const order = await db.order.update({
        where: { id: orderId },
        data: updateData,
        include: {
          items: true,
          payments: true,
        },
      });

      // Create order event
      await db.orderEvent.create({
        data: {
          orderId: order.id,
          type: 'order_updated',
          data: {
            updatedFields: Object.keys(updateData),
            previousStatus: existing.status,
            newStatus: data.status || existing.status,
          },
        },
      });

      return order;
    } catch (error: any) {
      // If it's already our custom error, re-throw it
      if (error.status && error.type) {
        throw error;
      }

      // Log Prisma/database errors
      console.error("❌ [ADMIN SERVICE] updateOrder error:", {
        orderId,
        error: {
          name: error?.name,
          message: error?.message,
          code: error?.code,
          meta: error?.meta,
          stack: error?.stack?.substring(0, 500),
        },
      });

      // Handle specific Prisma errors
      if (error?.code === 'P2025') {
        // Record not found
        throw {
          status: 404,
          type: "https://api.shop.am/problems/not-found",
          title: "Not Found",
          detail: error?.meta?.cause || "The requested order was not found",
        };
      }

      // Generic database error
      throw {
        status: 500,
        type: "https://api.shop.am/problems/internal-error",
        title: "Database Error",
        detail: error?.message || "An error occurred while updating the order",
      };
    }
  }
}

export const adminOrdersService = new AdminOrdersService();




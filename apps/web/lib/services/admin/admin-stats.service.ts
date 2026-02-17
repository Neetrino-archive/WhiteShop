import { db } from "@white-shop/db";

class AdminStatsService {
  /**
   * Get dashboard stats
   */
  async getStats() {
    // Count users
    const totalUsers = await db.user.count({
      where: { deletedAt: null },
    });

    // Count products
    const totalProducts = await db.product.count({
      where: { deletedAt: null },
    });

    // Count products with low stock (stock < 10)
    const lowStockProducts = await db.productVariant.count({
      where: {
        stock: { lt: 10 },
        published: true,
      },
    });

    // Count orders
    const totalOrders = await db.order.count();

    // Count recent orders (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentOrders = await db.order.count({
      where: {
        createdAt: { gte: sevenDaysAgo },
      },
    });

    // Count pending orders
    const pendingOrders = await db.order.count({
      where: { status: "pending" },
    });

    // Calculate total revenue from completed/paid orders
    const completedOrders = await db.order.findMany({
      where: {
        OR: [
          { status: "completed" },
          { paymentStatus: "paid" },
        ],
      },
      select: {
        total: true,
        currency: true,
      },
    });

    const totalRevenue = completedOrders.reduce((sum: number, order: { total: number; currency: string | null }) => sum + order.total, 0);
    const currency = completedOrders[0]?.currency || "AMD";

    return {
      users: {
        total: totalUsers,
      },
      products: {
        total: totalProducts,
        lowStock: lowStockProducts,
      },
      orders: {
        total: totalOrders,
        recent: recentOrders,
        pending: pendingOrders,
      },
      revenue: {
        total: totalRevenue,
        currency,
      },
    };
  }

  /**
   * Get user activity (recent registrations and active users)
   */
  async getUserActivity(limit: number = 10) {
    // Get recent registrations
    const recentUsers = await db.user.findMany({
      where: {
        deletedAt: null,
      },
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });

    const recentRegistrations = recentUsers.map((user: { id: string; email: string | null; phone: string | null; firstName: string | null; lastName: string | null; createdAt: Date }) => ({
      id: user.id,
      email: user.email || undefined,
      phone: user.phone || undefined,
      name: [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email || user.phone || "Unknown",
      registeredAt: user.createdAt.toISOString(),
      lastLoginAt: undefined, // We don't track last login yet
    }));

    // Get active users (users with orders)
    const usersWithOrders = await db.user.findMany({
      where: {
        deletedAt: null,
        orders: {
          some: {},
        },
      },
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        orders: {
          select: {
            id: true,
            total: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
      take: limit,
    });

    const activeUsers = usersWithOrders.map((user: { id: string; email: string | null; phone: string | null; firstName: string | null; lastName: string | null; createdAt: Date; orders: Array<{ id: string; total: number; createdAt: Date }> }) => {
      const orders = Array.isArray(user.orders) ? user.orders : [];
      const orderCount = orders.length;
      const totalSpent = orders.reduce((sum: number, order: { total: number }) => sum + order.total, 0);
      const lastOrder = orders[0] || null;

      return {
        id: user.id,
        email: user.email || undefined,
        phone: user.phone || undefined,
        name: [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email || user.phone || "Unknown",
        orderCount,
        totalSpent,
        lastOrderDate: lastOrder ? lastOrder.createdAt.toISOString() : user.createdAt.toISOString(),
        lastLoginAt: undefined, // We don't track last login yet
      };
    });

    return {
      recentRegistrations,
      activeUsers,
    };
  }

  /**
   * Get recent orders for dashboard
   */
  async getRecentOrders(limit: number = 5) {
    const orders = await db.order.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
      },
    });

    return orders.map((order: { id: string; number: string; status: string; paymentStatus: string; total: number; currency: string | null; customerEmail: string | null; customerPhone: string | null; createdAt: Date; items: Array<unknown> }) => ({
      id: order.id,
      number: order.number,
      status: order.status,
      paymentStatus: order.paymentStatus,
      total: order.total,
      currency: order.currency,
      customerEmail: order.customerEmail || undefined,
      customerPhone: order.customerPhone || undefined,
      itemsCount: order.items.length,
      createdAt: order.createdAt.toISOString(),
    }));
  }

  /**
   * Get top products for dashboard
   */
  async getTopProducts(limit: number = 5) {
    // Get all order items with their variants
    const orderItems = await db.orderItem.findMany({
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
          },
        },
      },
    });

    // Group by variant and calculate stats
    const productStats = new Map<
      string,
      {
        variantId: string;
        productId: string;
        title: string;
        sku: string;
        totalQuantity: number;
        totalRevenue: number;
        orderCount: number;
        image?: string | null;
      }
    >();

    orderItems.forEach((item: { variantId: string | null; quantity: number; total: number; variant?: { id: string; productId: string; sku: string | null; product?: { translations?: Array<{ title: string }>; media?: Array<{ url?: string }> } }; sku?: string }) => {
      if (!item.variant) return;

      const variantId = item.variantId || item.variant.id;
      const productId = item.variant.productId;
      const product = item.variant.product;
      const translations = product?.translations || [];
      const translation = translations[0];
      const title = translation?.title || "Unknown Product";
      const sku = item.variant.sku || item.sku || "N/A";
      const image = product && Array.isArray(product.media) && product.media.length > 0
        ? (product.media[0] as any)?.url || null
        : null;

      if (!productStats.has(variantId)) {
        productStats.set(variantId, {
          variantId,
          productId,
          title,
          sku,
          totalQuantity: 0,
          totalRevenue: 0,
          orderCount: 0,
          image,
        });
      }

      const stats = productStats.get(variantId)!;
      stats.totalQuantity += item.quantity;
      stats.totalRevenue += item.total;
      stats.orderCount += 1;
    });

    // Convert to array and sort by revenue
    const topProducts = Array.from(productStats.values())
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, limit);

    return topProducts;
  }

  /**
   * Get recent activity for dashboard
   */
  async getActivity(limit: number = 10) {
    const activities: Array<{
      type: string;
      title: string;
      description: string;
      timestamp: string;
    }> = [];

    // Get recent orders
    const recentOrders = await db.order.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
      },
    });

    recentOrders.forEach((order: { number: string; items: Array<unknown>; total: number; currency: string | null; createdAt: Date }) => {
      activities.push({
        type: "order",
        title: `New Order #${order.number}`,
        description: `${order.items.length} items • ${order.total} ${order.currency}`,
        timestamp: order.createdAt.toISOString(),
      });
    });

    // Get recent user registrations
    const recentUsers = await db.user.findMany({
      take: Math.floor(limit / 2),
      orderBy: { createdAt: "desc" },
      where: { deletedAt: null },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });

    recentUsers.forEach((user: { firstName: string | null; lastName: string | null; email: string | null; phone: string | null; createdAt: Date }) => {
      const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email || user.phone || "New User";
      activities.push({
        type: "user",
        title: "New User Registration",
        description: name,
        timestamp: user.createdAt.toISOString(),
      });
    });

    // Sort by timestamp (most recent first) and limit
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  /**
   * Get analytics data
   */
  async getAnalytics(period: string = 'week', startDate?: string, endDate?: string) {
    // Calculate date range based on period
    let start: Date;
    let end: Date = new Date();
    end.setHours(23, 59, 59, 999);

    switch (period) {
      case 'day':
        start = new Date();
        start.setHours(0, 0, 0, 0);
        break;
      case 'week':
        start = new Date();
        start.setDate(start.getDate() - 7);
        start.setHours(0, 0, 0, 0);
        break;
      case 'month':
        start = new Date();
        start.setDate(start.getDate() - 30);
        start.setHours(0, 0, 0, 0);
        break;
      case 'year':
        start = new Date();
        start.setFullYear(start.getFullYear() - 1);
        start.setHours(0, 0, 0, 0);
        break;
      case 'custom':
        if (startDate && endDate) {
          start = new Date(startDate);
          start.setHours(0, 0, 0, 0);
          end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
        } else {
          start = new Date();
          start.setDate(start.getDate() - 7);
          start.setHours(0, 0, 0, 0);
        }
        break;
      default:
        start = new Date();
        start.setDate(start.getDate() - 7);
        start.setHours(0, 0, 0, 0);
    }

    // Get orders in date range
    const orders = await db.order.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: {
                    translations: {
                      where: { locale: 'en' },
                      take: 1,
                    },
                    categories: {
                      include: {
                        translations: {
                          where: { locale: 'en' },
                          take: 1,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    // Calculate order statistics
    const totalOrders = orders.length;
    const paidOrders = orders.filter((o: { paymentStatus: string }) => o.paymentStatus === 'paid').length;
    const pendingOrders = orders.filter((o: { status: string }) => o.status === 'pending').length;
    const completedOrders = orders.filter((o: { status: string }) => o.status === 'completed').length;
    const totalRevenue = orders
      .filter((o: { paymentStatus: string }) => o.paymentStatus === 'paid')
      .reduce((sum: number, o: { total: number }) => sum + o.total, 0);

    // Calculate top products
    const productMap = new Map<string, {
      variantId: string;
      productId: string;
      title: string;
      sku: string;
      totalQuantity: number;
      totalRevenue: number;
      orderCount: number;
      image?: string | null;
    }>();

    orders.forEach((order: { items: Array<{ variantId: string | null; variant?: { product?: { id: string; translations?: Array<{ title: string }>; media?: Array<{ url?: string }> } }; productTitle?: string; sku?: string; quantity: number; total: number }> }) => {
      order.items.forEach((item: { variantId: string | null; variant?: { product?: { id: string; translations?: Array<{ title: string }>; media?: Array<{ url?: string }> } }; productTitle?: string; sku?: string; quantity: number; total: number }) => {
        if (item.variantId) {
          const key = item.variantId;
          const existing = productMap.get(key) || {
            variantId: item.variantId,
            productId: item.variant?.product?.id || '',
            title: item.productTitle || 'Unknown Product',
            sku: item.sku || 'N/A',
            totalQuantity: 0,
            totalRevenue: 0,
            orderCount: 0,
            image: null,
          };
          existing.totalQuantity += item.quantity;
          existing.totalRevenue += item.total;
          existing.orderCount += 1;
          productMap.set(key, existing);
        }
      });
    });

    const topProducts = Array.from(productMap.values())
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 10);

    // Calculate top categories
    const categoryMap = new Map<string, {
      categoryId: string;
      categoryName: string;
      totalQuantity: number;
      totalRevenue: number;
      orderCount: number;
    }>();

    orders.forEach((order: { items: Array<{ variant?: { product?: { categories: Array<{ id: string; translations?: Array<{ title: string }> }> } }; quantity: number; total: number }> }) => {
      order.items.forEach((item: { variant?: { product?: { categories: Array<{ id: string; translations?: Array<{ title: string }> }> } }; quantity: number; total: number }) => {
        if (item.variant?.product) {
          item.variant.product.categories.forEach((category: { id: string; translations?: Array<{ title: string }> }) => {
            const categoryId = category.id;
            const translations = category.translations || [];
            const categoryName = translations[0]?.title || category.id;
            const existing = categoryMap.get(categoryId) || {
              categoryId,
              categoryName,
              totalQuantity: 0,
              totalRevenue: 0,
              orderCount: 0,
            };
            existing.totalQuantity += item.quantity;
            existing.totalRevenue += item.total;
            existing.orderCount += 1;
            categoryMap.set(categoryId, existing);
          });
        }
      });
    });

    const topCategories = Array.from(categoryMap.values())
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 10);

    // Calculate orders by day
    const ordersByDayMap = new Map<string, { count: number; revenue: number }>();

    orders.forEach((order: { createdAt: Date; paymentStatus: string; total: number }) => {
      const dateKey = order.createdAt.toISOString().split('T')[0];
      const existing = ordersByDayMap.get(dateKey) || { count: 0, revenue: 0 };
      existing.count += 1;
      if (order.paymentStatus === 'paid') {
        existing.revenue += order.total;
      }
      ordersByDayMap.set(dateKey, existing);
    });

    const ordersByDay = Array.from(ordersByDayMap.entries())
      .map(([date, data]) => ({
        _id: date,
        count: data.count,
        revenue: data.revenue,
      }))
      .sort((a, b) => a._id.localeCompare(b._id));

    return {
      period,
      dateRange: {
        start: start.toISOString(),
        end: end.toISOString(),
      },
      orders: {
        totalOrders,
        totalRevenue,
        paidOrders,
        pendingOrders,
        completedOrders,
      },
      topProducts,
      topCategories,
      ordersByDay,
    };
  }
}

export const adminStatsService = new AdminStatsService();




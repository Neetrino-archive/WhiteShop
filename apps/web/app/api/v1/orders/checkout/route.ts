import { NextRequest, NextResponse } from "next/server";
import { authenticateToken } from "@/lib/middleware/auth";
import { ordersService } from "@/lib/services/orders.service";

export async function POST(req: NextRequest) {
  try {
    console.log("📦 [ORDERS API] Checkout request received");
    const user = await authenticateToken(req);
    const data = await req.json();
    
    console.log("📦 [ORDERS API] Checkout data:", {
      userId: user?.id,
      cartId: data.cartId,
      itemsCount: data.items?.length || 0,
      email: data.email,
      phone: data.phone,
      paymentMethod: data.paymentMethod,
      shippingMethod: data.shippingMethod,
    });
    
    const result = await ordersService.checkout(data, user?.id);
    
    console.log("✅ [ORDERS API] Checkout successful:", {
      orderNumber: result.order?.number,
      orderId: result.order?.id,
      total: result.order?.total,
    });
    
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("❌ [ORDERS API] Checkout error:", {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
      type: error?.type,
      title: error?.title,
      status: error?.status,
      detail: error?.detail,
      code: error?.code,
      meta: error?.meta,
      fullError: error,
    });
    return NextResponse.json(
      {
        type: error.type || "https://api.shop.am/problems/internal-error",
        title: error.title || "Internal Server Error",
        status: error.status || 500,
        detail: error.detail || error.message || "An error occurred",
        instance: req.url,
      },
      { status: error.status || 500 }
    );
  }
}


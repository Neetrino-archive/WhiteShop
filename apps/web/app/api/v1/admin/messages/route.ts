import { NextRequest, NextResponse } from "next/server";
import { authenticateToken, requireAdmin } from "@/lib/middleware/auth";
import { db } from "@white-shop/db";

/**
 * GET /api/v1/admin/messages
 * Get all contact messages (admin only)
 */
export async function GET(req: NextRequest) {
  try {
    const user = await authenticateToken(req);
    if (!user || !requireAdmin(user)) {
      return NextResponse.json(
        {
          type: "https://api.shop.am/problems/forbidden",
          title: "Forbidden",
          status: 403,
          detail: "Admin access required",
          instance: req.url,
        },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    // Get total count
    let total: number;
    let messages: any[];
    
    try {
      total = await db.contactMessage.count();
    } catch (dbError: any) {
      console.error("❌ [ADMIN MESSAGES] Database count error:", dbError);
      throw new Error(`Database query failed: ${dbError.message || 'Unknown database error'}. Make sure Prisma Client is generated and migrations are applied.`);
    }

    try {
      // Get messages
      messages = await db.contactMessage.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (dbError: any) {
      console.error("❌ [ADMIN MESSAGES] Database findMany error:", dbError);
      throw new Error(`Database query failed: ${dbError.message || 'Unknown database error'}. Make sure Prisma Client is generated and migrations are applied.`);
    }

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: messages,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error: any) {
    console.error("❌ [ADMIN MESSAGES] Error:", error);
    console.error("❌ [ADMIN MESSAGES] Error stack:", error.stack);
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

/**
 * DELETE /api/v1/admin/messages
 * Delete multiple messages by IDs (admin only)
 */
export async function DELETE(req: NextRequest) {
  try {
    const user = await authenticateToken(req);
    if (!user || !requireAdmin(user)) {
      return NextResponse.json(
        {
          type: "https://api.shop.am/problems/forbidden",
          title: "Forbidden",
          status: 403,
          detail: "Admin access required",
          instance: req.url,
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        {
          type: "https://api.shop.am/problems/validation-error",
          title: "Validation Error",
          status: 400,
          detail: "Field 'ids' is required and must be a non-empty array",
          instance: req.url,
        },
        { status: 400 }
      );
    }

    // Delete messages
    const result = await db.contactMessage.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    console.log(`✅ [ADMIN MESSAGES] Deleted ${result.count} messages`);

    return NextResponse.json({
      data: {
        deletedCount: result.count,
      },
    });
  } catch (error: any) {
    console.error("❌ [ADMIN MESSAGES] Error:", error);
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




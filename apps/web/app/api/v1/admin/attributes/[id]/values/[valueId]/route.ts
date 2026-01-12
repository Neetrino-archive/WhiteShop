import { NextRequest, NextResponse } from "next/server";
import { authenticateToken, requireAdmin } from "@/lib/middleware/auth";
import { adminService } from "@/lib/services/admin.service";

/**
 * PATCH /api/v1/admin/attributes/[id]/values/[valueId]
 * Update an attribute value
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; valueId: string }> }
) {
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

    const { id: attributeId, valueId } = await params;
    const body = await req.json();

    console.log('✏️ [ADMIN ATTRIBUTE VALUES] PATCH request:', { attributeId, valueId, body });

    const result = await adminService.updateAttributeValue(attributeId, valueId, {
      label: body.label,
      colors: body.colors,
      imageUrl: body.imageUrl,
      locale: body.locale || "en",
    });

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    console.error("❌ [ADMIN ATTRIBUTE VALUES] PATCH Error:", error);
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
 * DELETE /api/v1/admin/attributes/[id]/values/[valueId]
 * Delete an attribute value
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; valueId: string }> }
) {
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

    const { valueId } = await params;
    const result = await adminService.deleteAttributeValue(valueId);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    console.error("❌ [ADMIN ATTRIBUTE VALUES] DELETE Error:", error);
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


/**
 * Admin Service - Combined service that delegates to specialized services
 * This file combines all admin-related services for backward compatibility
 */

import { adminStatsService } from "./admin/admin-stats.service";
import { adminUsersService } from "./admin/admin-users.service";
import { adminOrdersService } from "./admin/admin-orders.service";
import { adminSettingsService } from "./admin/admin-settings.service";
import { adminDeliveryService } from "./admin/admin-delivery.service";
import { adminBrandsService } from "./admin/admin-brands.service";

// Import remaining methods from original file (temporary - will be moved to separate services)
// These will be moved to admin-products.service.ts, admin-categories.service.ts, and admin-attributes.service.ts
import { db } from "@white-shop/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { findOrCreateAttributeValue } from "../utils/variant-generator";
import { ensureProductAttributesTable, ensureProductVariantAttributesColumn } from "../utils/db-ensure";
import {
  processImageUrl,
  smartSplitUrls,
  cleanImageUrls,
  separateMainAndVariantImages,
} from "../utils/image-utils";

class AdminService {
  // Delegate to specialized services
  getStats = adminStatsService.getStats.bind(adminStatsService);
  getUserActivity = adminStatsService.getUserActivity.bind(adminStatsService);
  getRecentOrders = adminStatsService.getRecentOrders.bind(adminStatsService);
  getTopProducts = adminStatsService.getTopProducts.bind(adminStatsService);
  getActivity = adminStatsService.getActivity.bind(adminStatsService);
  getAnalytics = adminStatsService.getAnalytics.bind(adminStatsService);

  getUsers = adminUsersService.getUsers.bind(adminUsersService);
  updateUser = adminUsersService.updateUser.bind(adminUsersService);
  deleteUser = adminUsersService.deleteUser.bind(adminUsersService);

  getOrders = adminOrdersService.getOrders.bind(adminOrdersService);
  getOrderById = adminOrdersService.getOrderById.bind(adminOrdersService);
  deleteOrder = adminOrdersService.deleteOrder.bind(adminOrdersService);
  updateOrder = adminOrdersService.updateOrder.bind(adminOrdersService);

  getSettings = adminSettingsService.getSettings.bind(adminSettingsService);
  updateSettings = adminSettingsService.updateSettings.bind(adminSettingsService);
  getPriceFilterSettings = adminSettingsService.getPriceFilterSettings.bind(adminSettingsService);
  updatePriceFilterSettings = adminSettingsService.updatePriceFilterSettings.bind(adminSettingsService);

  getDeliverySettings = adminDeliveryService.getDeliverySettings.bind(adminDeliveryService);
  getDeliveryPrice = adminDeliveryService.getDeliveryPrice.bind(adminDeliveryService);
  updateDeliverySettings = adminDeliveryService.updateDeliverySettings.bind(adminDeliveryService);

  getBrands = adminBrandsService.getBrands.bind(adminBrandsService);
  createBrand = adminBrandsService.createBrand.bind(adminBrandsService);
  updateBrand = adminBrandsService.updateBrand.bind(adminBrandsService);
  deleteBrand = adminBrandsService.deleteBrand.bind(adminBrandsService);

  // TODO: Move these to separate services:
  // - Products methods (getProducts, getProductById, createProduct, updateProduct, deleteProduct, updateProductDiscount, generateUniqueSku)
  // - Categories methods (getCategories, createCategory, getCategoryById, updateCategory, deleteCategory, isCategoryDescendant)
  // - Attributes methods (getAttributes, createAttribute, updateAttributeTranslation, addAttributeValue, updateAttributeValue, deleteAttribute, deleteAttributeValue, ensureColorsColumnsExist)
  
  // For now, these methods will remain in the original admin.service.ts file
  // They will be moved to admin-products.service.ts, admin-categories.service.ts, and admin-attributes.service.ts
}

export const adminService = new AdminService();




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
import { adminCategoriesService } from "./admin/admin-categories.service";
import { adminProductsService } from "./admin/admin-products.service";
import { adminAttributesService } from "./admin/admin-attributes.service";

class AdminService {
  // Delegate to specialized services
  
  // Stats methods
  getStats = adminStatsService.getStats.bind(adminStatsService);
  getUserActivity = adminStatsService.getUserActivity.bind(adminStatsService);
  getRecentOrders = adminStatsService.getRecentOrders.bind(adminStatsService);
  getTopProducts = adminStatsService.getTopProducts.bind(adminStatsService);
  getActivity = adminStatsService.getActivity.bind(adminStatsService);
  getAnalytics = adminStatsService.getAnalytics.bind(adminStatsService);

  // Users methods
  getUsers = adminUsersService.getUsers.bind(adminUsersService);
  updateUser = adminUsersService.updateUser.bind(adminUsersService);
  deleteUser = adminUsersService.deleteUser.bind(adminUsersService);

  // Orders methods
  getOrders = adminOrdersService.getOrders.bind(adminOrdersService);
  getOrderById = adminOrdersService.getOrderById.bind(adminOrdersService);
  deleteOrder = adminOrdersService.deleteOrder.bind(adminOrdersService);
  updateOrder = adminOrdersService.updateOrder.bind(adminOrdersService);

  // Settings methods
  getSettings = adminSettingsService.getSettings.bind(adminSettingsService);
  updateSettings = adminSettingsService.updateSettings.bind(adminSettingsService);
  getPriceFilterSettings = adminSettingsService.getPriceFilterSettings.bind(adminSettingsService);
  updatePriceFilterSettings = adminSettingsService.updatePriceFilterSettings.bind(adminSettingsService);

  // Delivery methods
  getDeliverySettings = adminDeliveryService.getDeliverySettings.bind(adminDeliveryService);
  getDeliveryPrice = adminDeliveryService.getDeliveryPrice.bind(adminDeliveryService);
  updateDeliverySettings = adminDeliveryService.updateDeliverySettings.bind(adminDeliveryService);

  // Brands methods
  getBrands = adminBrandsService.getBrands.bind(adminBrandsService);
  createBrand = adminBrandsService.createBrand.bind(adminBrandsService);
  updateBrand = adminBrandsService.updateBrand.bind(adminBrandsService);
  deleteBrand = adminBrandsService.deleteBrand.bind(adminBrandsService);

  // Categories methods
  getCategories = adminCategoriesService.getCategories.bind(adminCategoriesService);
  createCategory = adminCategoriesService.createCategory.bind(adminCategoriesService);
  getCategoryById = adminCategoriesService.getCategoryById.bind(adminCategoriesService);
  updateCategory = adminCategoriesService.updateCategory.bind(adminCategoriesService);
  deleteCategory = adminCategoriesService.deleteCategory.bind(adminCategoriesService);

  // Products methods
  getProducts = adminProductsService.getProducts.bind(adminProductsService);
  getProductById = adminProductsService.getProductById.bind(adminProductsService);
  createProduct = adminProductsService.createProduct.bind(adminProductsService);
  updateProduct = adminProductsService.updateProduct.bind(adminProductsService);
  deleteProduct = adminProductsService.deleteProduct.bind(adminProductsService);
  updateProductDiscount = adminProductsService.updateProductDiscount.bind(adminProductsService);

  // Attributes methods
  getAttributes = adminAttributesService.getAttributes.bind(adminAttributesService);
  createAttribute = adminAttributesService.createAttribute.bind(adminAttributesService);
  updateAttributeTranslation = adminAttributesService.updateAttributeTranslation.bind(adminAttributesService);
  addAttributeValue = adminAttributesService.addAttributeValue.bind(adminAttributesService);
  updateAttributeValue = adminAttributesService.updateAttributeValue.bind(adminAttributesService);
  deleteAttribute = adminAttributesService.deleteAttribute.bind(adminAttributesService);
  deleteAttributeValue = adminAttributesService.deleteAttributeValue.bind(adminAttributesService);
}

export const adminService = new AdminService();

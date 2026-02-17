/**
 * Admin Products Service - Combined service that delegates to specialized services
 * This file combines all product-related services for backward compatibility
 */

import { adminProductsReadService } from "./admin-products-read.service";
import { adminProductsCreateService } from "./admin-products-create.service";
import { adminProductsUpdateService } from "./admin-products-update.service";
import { adminProductsDeleteService } from "./admin-products-delete.service";

class AdminProductsService {
  // Delegate to specialized services
  
  // Read methods
  getProducts = adminProductsReadService.getProducts.bind(adminProductsReadService);
  getProductById = adminProductsReadService.getProductById.bind(adminProductsReadService);

  // Create methods
  createProduct = adminProductsCreateService.createProduct.bind(adminProductsCreateService);

  // Update methods
  updateProduct = adminProductsUpdateService.updateProduct.bind(adminProductsUpdateService);

  // Delete/Discount methods
  deleteProduct = adminProductsDeleteService.deleteProduct.bind(adminProductsDeleteService);
  updateProductDiscount = adminProductsDeleteService.updateProductDiscount.bind(adminProductsDeleteService);
}

export const adminProductsService = new AdminProductsService();

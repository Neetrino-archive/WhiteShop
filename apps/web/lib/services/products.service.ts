/**
 * Products Service - Combined service that delegates to specialized services
 * This file combines all product-related services for backward compatibility
 */

import { productsFindService } from "./products-find.service";
import { productsFiltersService } from "./products-filters.service";
import { productsSlugService } from "./products-slug.service";

// Re-export types for backward compatibility
export type { ProductFilters, ProductWithRelations } from "./products-find-query.service";

class ProductsService {
  // Delegate to specialized services
  
  // Find methods
  findAll = productsFindService.findAll.bind(productsFindService);

  // Filters methods
  getFilters = productsFiltersService.getFilters.bind(productsFiltersService);
  getPriceRange = productsFiltersService.getPriceRange.bind(productsFiltersService);

  // Slug methods
  findBySlug = productsSlugService.findBySlug.bind(productsSlugService);
}

export const productsService = new ProductsService();

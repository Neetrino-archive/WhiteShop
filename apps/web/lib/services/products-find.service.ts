import { ProductFilters } from "./products-find-query.service";
import { productsFindQueryService } from "./products-find-query.service";
import { productsFindFilterService } from "./products-find-filter.service";
import { productsFindTransformService } from "./products-find-transform.service";

class ProductsFindService {
  /**
   * Get all products with filters
   */
  async findAll(filters: ProductFilters) {
    const {
      page = 1,
      limit = 24,
      lang = "en",
    } = filters;

    // Step 1: Build query and fetch products from database
    const { products, bestsellerProductIds } = await productsFindQueryService.buildQueryAndFetch(filters);

    // Step 2: Filter products in memory (price, colors, sizes, brand) and sort
    const filteredProducts = productsFindFilterService.filterProducts(
      products,
      filters,
      bestsellerProductIds
    );

    // Step 3: Apply pagination
    const total = filteredProducts.length;
    const paginatedProducts = filteredProducts.slice(0, limit);

    // Step 4: Transform products to response format
    const data = await productsFindTransformService.transformProducts(paginatedProducts, lang);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

export const productsFindService = new ProductsFindService();


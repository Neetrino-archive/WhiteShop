/**
 * Script to add 10 new products to the database
 * Usage: npx tsx scripts/add-10-new-products.ts
 */

// Load environment variables FIRST, before importing db
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load .env from root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootPath = path.resolve(__dirname, "..");
const envPath = path.join(rootPath, ".env");

console.log(`📂 Looking for .env file at: ${envPath}`);

// Try loading from multiple locations
const envResult1 = dotenv.config({ path: envPath });
const envResult2 = dotenv.config(); // Also try default location

if (envResult1.error && envResult2.error) {
  console.warn("⚠️  Warning: Could not load .env file from custom path");
}

// Check if DATABASE_URL is loaded and valid
const dbUrl = process.env.DATABASE_URL || "";
if (!dbUrl || !dbUrl.startsWith("postgresql://") && !dbUrl.startsWith("postgres://")) {
  console.error("❌ Error: DATABASE_URL is not set or invalid in environment variables!");
  console.error(`   Checked path: ${envPath}`);
  console.error(`   Current value: ${dbUrl ? `"${dbUrl.substring(0, 50)}..."` : "(empty)"}`);
  console.error("   Please make sure .env file exists in the root directory with DATABASE_URL");
  console.error("   Format: DATABASE_URL=\"postgresql://user:password@host:5432/dbname?schema=public\"");
  process.exit(1);
}

console.log(`✅ DATABASE_URL loaded (starts with: ${dbUrl.substring(0, 30)}...)`);

// Now import db after environment is loaded
import { db } from "../packages/db";

// 10 New products data
const newProducts = [
  {
    title: "Premium Leather Wallet",
    slug: "premium-leather-wallet",
    subtitle: "Handcrafted genuine leather",
    descriptionHtml: "<p>Elegant leather wallet with multiple card slots and cash compartment. Made from premium Italian leather.</p>",
    colors: ["Brown", "Black", "Tan"],
    sizes: [],
    price: 65.00,
    compareAtPrice: 85.00,
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop",
  },
  {
    title: "Classic Oxford Dress Shirt",
    slug: "classic-oxford-dress-shirt",
    subtitle: "Formal elegance",
    descriptionHtml: "<p>Premium cotton oxford shirt perfect for business and formal occasions. Wrinkle-resistant fabric.</p>",
    colors: ["White", "Light Blue", "Pale Pink"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    price: 75.00,
    compareAtPrice: 95.00,
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1594938291221-94f18cbb7080?w=800&h=800&fit=crop",
  },
  {
    title: "Sporty Fitness Tracker",
    slug: "sporty-fitness-tracker",
    subtitle: "Track your health",
    descriptionHtml: "<p>Advanced fitness tracker with heart rate monitor, step counter, and sleep tracking. Water-resistant design.</p>",
    colors: ["Black", "Blue", "Pink"],
    sizes: [],
    price: 89.99,
    compareAtPrice: 119.99,
    stock: 35,
    imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop",
  },
  {
    title: "Elegant Silk Scarf",
    slug: "elegant-silk-scarf",
    subtitle: "Luxury accessory",
    descriptionHtml: "<p>Beautiful silk scarf with intricate patterns. Perfect for adding elegance to any outfit.</p>",
    colors: ["Navy Blue", "Burgundy", "Emerald Green", "Ivory"],
    sizes: [],
    price: 55.00,
    compareAtPrice: 75.00,
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop",
  },
  {
    title: "Comfortable Linen Pants",
    slug: "comfortable-linen-pants",
    subtitle: "Breathable summer wear",
    descriptionHtml: "<p>Lightweight linen pants perfect for warm weather. Comfortable fit with modern design.</p>",
    colors: ["Beige", "Navy", "Olive Green"],
    sizes: ["30", "32", "34", "36", "38"],
    price: 85.00,
    compareAtPrice: 110.00,
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=800&fit=crop",
  },
  {
    title: "Stylish Canvas Sneakers",
    slug: "stylish-canvas-sneakers",
    subtitle: "Casual comfort",
    descriptionHtml: "<p>Classic canvas sneakers with rubber sole. Perfect for everyday casual wear.</p>",
    colors: ["White", "Black", "Navy", "Red"],
    sizes: ["39", "40", "41", "42", "43", "44"],
    price: 45.00,
    compareAtPrice: 60.00,
    stock: 70,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
  },
  {
    title: "Wool Blend Cardigan",
    slug: "wool-blend-cardigan",
    subtitle: "Cozy warmth",
    descriptionHtml: "<p>Soft wool blend cardigan perfect for layering. Comfortable and stylish for any season.</p>",
    colors: ["Gray", "Navy", "Camel", "Black"],
    sizes: ["S", "M", "L", "XL"],
    price: 95.00,
    compareAtPrice: 125.00,
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop",
  },
  {
    title: "Minimalist Watch",
    slug: "minimalist-watch",
    subtitle: "Timeless design",
    descriptionHtml: "<p>Elegant minimalist watch with leather strap. Classic design that never goes out of style.</p>",
    colors: ["Silver", "Gold", "Rose Gold"],
    sizes: [],
    price: 120.00,
    compareAtPrice: 160.00,
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
  },
  {
    title: "Structured Tote Bag",
    slug: "structured-tote-bag",
    subtitle: "Spacious and stylish",
    descriptionHtml: "<p>Structured tote bag with multiple compartments. Perfect for work, travel, or shopping.</p>",
    colors: ["Black", "Brown", "Beige"],
    sizes: [],
    price: 110.00,
    compareAtPrice: 145.00,
    stock: 28,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
  },
  {
    title: "Performance Running Shorts",
    slug: "performance-running-shorts",
    subtitle: "Active lifestyle",
    descriptionHtml: "<p>Lightweight running shorts with moisture-wicking fabric. Perfect for workouts and sports.</p>",
    colors: ["Black", "Navy", "Gray", "Blue"],
    sizes: ["S", "M", "L", "XL"],
    price: 35.00,
    compareAtPrice: 50.00,
    stock: 55,
    imageUrl: "https://images.unsplash.com/photo-1506629905607-0c8c0e0c0a5a?w=800&h=800&fit=crop",
  },
];

async function main() {
  console.log("🚀 Starting to add 10 new products...\n");

  try {
    // Get all published categories
    const categories = await db.category.findMany({
      where: {
        published: true,
        deletedAt: null,
      },
      include: {
        translations: {
          where: { locale: "en" },
        },
      },
    });

    console.log(`📁 Found ${categories.length} published categories`);

    // Get all published brands
    const brands = await db.brand.findMany({
      where: {
        published: true,
        deletedAt: null,
      },
      include: {
        translations: {
          where: { locale: "en" },
        },
      },
    });

    console.log(`🏷️  Found ${brands.length} published brands\n`);

    // Create default brand if none exists
    if (brands.length === 0) {
      console.log("⚠️  No brands found. Creating a default brand...");
      const defaultBrand = await db.brand.create({
        data: {
          slug: "white-shop-brand",
          published: true,
          translations: {
            create: {
              locale: "en",
              name: "White Shop",
            },
          },
        },
      });
      brands.push(defaultBrand);
      console.log(`✅ Created default brand: White Shop\n`);
    }

    // Create default category if none exists
    if (categories.length === 0) {
      console.log("⚠️  No categories found. Creating a default category...");
      const defaultCategory = await db.category.create({
        data: {
          published: true,
          translations: {
            create: {
              locale: "en",
              title: "General",
              slug: "general",
              fullPath: "general",
            },
          },
        },
      });
      categories.push(defaultCategory);
      console.log(`✅ Created default category: General\n`);
    }

    // Get unique category slugs
    const categorySlugs = Array.from(
      new Set(
        categories
          .map((cat) => cat.translations.find((t) => t.locale === "en")?.slug)
          .filter((slug): slug is string => !!slug)
      )
    );

    console.log(`📋 Available category slugs: ${categorySlugs.join(", ")}\n`);

    let createdCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < newProducts.length; i++) {
      const productData = newProducts[i];
      try {
        // Distribute products across available categories
        const categorySlug = categorySlugs[i % categorySlugs.length];
        
        // Find category by slug
        const category = categories.find((cat) => {
          const translation = cat.translations.find((t) => t.locale === "en");
          return translation?.slug === categorySlug;
        });

        if (!category) {
          console.log(`⚠️  Category "${categorySlug}" not found, skipping product: ${productData.title}`);
          skippedCount++;
          continue;
        }

        console.log(`📦 Processing "${productData.title}" → Category: ${categorySlug}`);

        // Check if product already exists
        const existingProduct = await db.product.findFirst({
          where: {
            translations: {
              some: {
                slug: productData.slug,
                locale: "en",
              },
            },
            deletedAt: null,
          },
        });

        if (existingProduct) {
          console.log(`⏭️  Product "${productData.title}" already exists, skipping...\n`);
          skippedCount++;
          continue;
        }

        // Select a random brand
        const brand = brands[Math.floor(Math.random() * brands.length)];

        // Generate variants
        const variants: any[] = [];
        
        if (productData.sizes.length > 0 && productData.colors.length > 0) {
          // Create variants for each color and size combination
          for (const color of productData.colors) {
            for (const size of productData.sizes) {
              variants.push({
                price: productData.price,
                compareAtPrice: productData.compareAtPrice,
                stock: Math.floor(productData.stock / (productData.colors.length * productData.sizes.length)) || 5,
                sku: `${productData.slug}-${color.toLowerCase().replace(/\s+/g, "-")}-${size}`,
                published: true,
                options: {
                  create: [
                    { attributeKey: "color", value: color },
                    { attributeKey: "size", value: size },
                  ],
                },
              });
            }
          }
        } else if (productData.colors.length > 0) {
          // Create variants for each color only
          for (const color of productData.colors) {
            variants.push({
              price: productData.price,
              compareAtPrice: productData.compareAtPrice,
              stock: Math.floor(productData.stock / productData.colors.length) || 10,
              sku: `${productData.slug}-${color.toLowerCase().replace(/\s+/g, "-")}`,
              published: true,
              options: {
                create: [
                  { attributeKey: "color", value: color },
                ],
              },
            });
          }
        } else {
          // Single variant without color or size
          variants.push({
            price: productData.price,
            compareAtPrice: productData.compareAtPrice,
            stock: productData.stock,
            sku: productData.slug,
            published: true,
            options: {
              create: [],
            },
          });
        }

        // Create product with image
        const product = await db.product.create({
          data: {
            brandId: brand.id,
            primaryCategoryId: category.id,
            categoryIds: [category.id],
            published: true,
            publishedAt: new Date(),
            media: productData.imageUrl ? [{ url: productData.imageUrl, type: "image" }] : [],
            translations: {
              create: {
                locale: "en",
                title: productData.title,
                slug: productData.slug,
                subtitle: productData.subtitle,
                descriptionHtml: productData.descriptionHtml,
              },
            },
            variants: {
              create: variants,
            },
          },
        });

        console.log(`✅ Created product: ${productData.title} (${variants.length} variants)\n`);
        createdCount++;
      } catch (error: any) {
        console.error(`❌ Error creating product "${productData.title}":`, error.message);
        console.error(`   Stack: ${error.stack}\n`);
        skippedCount++;
      }
    }

    console.log(`\n✨ Done! Created ${createdCount} products, skipped ${skippedCount} products.`);
  } catch (error) {
    console.error("❌ Fatal error:", error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

main();


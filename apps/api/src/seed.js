/**
 * Database Seed Script
 * 
 * Ստեղծում է նոր տվյալների բազա հին բազայի նման
 * 
 * Usage: node src/seed.js
 * 
 * Սա կստեղծի:
 * - Admin user (admin@shop.am / admin123)
 * - Test user (test@shop.am / test123)
 * - 9 Brands (Apple, Samsung, Nike, Adidas, Dell, Sony, Xiaomi, Puma, L'Oreal)
 * - 15 Categories (հիերարխիկ կառուցվածք)
 * - Attributes (Color, Size)
 * - 35 Products with variants (100% working image URLs from Unsplash)
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { connectDB } = require('./lib/mongodb');

// Models
const User = require('./models/User');
const Brand = require('./models/Brand');
const Category = require('./models/Category');
const Attribute = require('./models/Attribute');
const Product = require('./models/Product');

/**
 * Clear all collections (optional - for fresh start)
 */
async function clearDatabase() {
  console.log('🗑️  Clearing existing data...');
  
  try {
    await User.deleteMany({});
    await Brand.deleteMany({});
    await Category.deleteMany({});
    await Attribute.deleteMany({});
    await Product.deleteMany({});
    
    console.log('✅ Database cleared');
  } catch (error) {
    console.error('⚠️  Error clearing database:', error.message);
    // Continue anyway
  }
}

/**
 * Create admin and test users
 */
async function createUsers() {
  console.log('\n👤 Creating users...');
  
  // Admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await User.create({
    email: 'admin@shop.am',
    passwordHash: adminPassword,
    firstName: 'Admin',
    lastName: 'User',
    emailVerified: true,
    locale: 'en',
    roles: ['admin', 'customer'],
  });
  console.log('✅ Admin user created:', adminUser.email);
  
  // Test user
  const testPassword = await bcrypt.hash('test123', 10);
  const testUser = await User.create({
    email: 'test@shop.am',
    passwordHash: testPassword,
    firstName: 'Test',
    lastName: 'User',
    emailVerified: true,
    locale: 'en',
    roles: ['customer'],
  });
  console.log('✅ Test user created:', testUser.email);
  
  return { adminUser, testUser };
}

/**
 * Create brands
 */
async function createBrands() {
  console.log('\n🏷️  Creating brands...');
  
  const brands = [
    {
      slug: 'apple',
      published: true,
      translations: [
        {
          locale: 'en',
          name: 'Apple',
          description: 'Premium technology products',
        },
        {
          locale: 'hy',
          name: 'Apple',
          description: 'Պրեմիում տեխնոլոգիական արտադրանք',
        },
      ],
    },
    {
      slug: 'samsung',
      published: true,
      translations: [
        {
          locale: 'en',
          name: 'Samsung',
          description: 'Innovative electronics and appliances',
        },
        {
          locale: 'hy',
          name: 'Samsung',
          description: 'Նորարարական էլեկտրոնիկա և տեխնիկա',
        },
      ],
    },
    {
      slug: 'nike',
      published: true,
      translations: [
        {
          locale: 'en',
          name: 'Nike',
          description: 'Just Do It - Athletic wear and footwear',
        },
        {
          locale: 'hy',
          name: 'Nike',
          description: 'Just Do It - Սպորտային հագուստ և կոշիկ',
        },
      ],
    },
    {
      slug: 'adidas',
      published: true,
      translations: [
        {
          locale: 'en',
          name: 'Adidas',
          description: 'Impossible is Nothing - Sportswear and shoes',
        },
        {
          locale: 'hy',
          name: 'Adidas',
          description: 'Impossible is Nothing - Սպորտային հագուստ և կոշիկ',
        },
      ],
    },
    {
      slug: 'dell',
      published: true,
      translations: [
        {
          locale: 'en',
          name: 'Dell',
          description: 'Computers and laptops',
        },
        {
          locale: 'hy',
          name: 'Dell',
          description: 'Համակարգիչներ և լապտոպներ',
        },
      ],
    },
    {
      slug: 'sony',
      published: true,
      translations: [
        {
          locale: 'en',
          name: 'Sony',
          description: 'Electronics and entertainment',
        },
        {
          locale: 'hy',
          name: 'Sony',
          description: 'Էլեկտրոնիկա և ժամանց',
        },
      ],
    },
    {
      slug: 'xiaomi',
      published: true,
      translations: [
        {
          locale: 'en',
          name: 'Xiaomi',
          description: 'Smart devices and electronics',
        },
        {
          locale: 'hy',
          name: 'Xiaomi',
          description: 'Սմարթ սարքեր և էլեկտրոնիկա',
        },
      ],
    },
    {
      slug: 'puma',
      published: true,
      translations: [
        {
          locale: 'en',
          name: 'Puma',
          description: 'Sportswear and athletic gear',
        },
        {
          locale: 'hy',
          name: 'Puma',
          description: 'Սպորտային հագուստ և պարագաներ',
        },
      ],
    },
    {
      slug: 'loreal',
      published: true,
      translations: [
        {
          locale: 'en',
          name: "L'Oreal",
          description: 'Beauty and cosmetics',
        },
        {
          locale: 'hy',
          name: "L'Oreal",
          description: 'Գեղեցկություն և կոսմետիկա',
        },
      ],
    },
  ];
  
  const createdBrands = await Brand.insertMany(brands);
  console.log(`✅ Created ${createdBrands.length} brands`);
  
  // Create brand map for easy lookup
  const brandMap = {};
  createdBrands.forEach(brand => {
    brandMap[brand.slug] = brand._id;
  });
  
  return brandMap;
}

/**
 * Create categories (hierarchical structure)
 */
async function createCategories() {
  console.log('\n📁 Creating categories...');
  
  // Root categories
  const electronics = await Category.create({
    position: 1,
    published: true,
    translations: [
      {
        locale: 'en',
        title: 'Electronics',
        slug: 'electronics',
        fullPath: 'electronics',
        description: 'Electronic devices and gadgets',
      },
      {
        locale: 'hy',
        title: 'Էլեկտրոնիկա',
        slug: 'electronics',
        fullPath: 'electronics',
        description: 'Էլեկտրոնային սարքեր և գաջեթներ',
      },
    ],
  });
  
  const clothing = await Category.create({
    position: 2,
    published: true,
    translations: [
      {
        locale: 'en',
        title: 'Clothing',
        slug: 'clothing',
        fullPath: 'clothing',
        description: 'Fashion and apparel',
      },
      {
        locale: 'hy',
        title: 'Հագուստ',
        slug: 'clothing',
        fullPath: 'clothing',
        description: 'Նորաձևություն և հագուստ',
      },
    ],
  });
  
  const home = await Category.create({
    position: 3,
    published: true,
    translations: [
      {
        locale: 'en',
        title: 'Home & Living',
        slug: 'home',
        fullPath: 'home',
        description: 'Home decor and living essentials',
      },
      {
        locale: 'hy',
        title: 'Տուն և կենցաղ',
        slug: 'home',
        fullPath: 'home',
        description: 'Տան դեկոր և կենցաղային պարագաներ',
      },
    ],
  });
  
  const beauty = await Category.create({
    position: 4,
    published: true,
    translations: [
      {
        locale: 'en',
        title: 'Beauty & Cosmetics',
        slug: 'beauty',
        fullPath: 'beauty',
        description: 'Beauty products and cosmetics',
      },
      {
        locale: 'hy',
        title: 'Գեղեցկություն և կոսմետիկա',
        slug: 'beauty',
        fullPath: 'beauty',
        description: 'Գեղեցկության արտադրանք և կոսմետիկա',
      },
    ],
  });
  
  const books = await Category.create({
    position: 5,
    published: true,
    translations: [
      {
        locale: 'en',
        title: 'Books',
        slug: 'books',
        fullPath: 'books',
        description: 'Books and literature',
      },
      {
        locale: 'hy',
        title: 'Գրքեր',
        slug: 'books',
        fullPath: 'books',
        description: 'Գրքեր և գրականություն',
      },
    ],
  });
  
  // Electronics subcategories
  const smartphones = await Category.create({
    parentId: electronics._id,
    position: 1,
    published: true,
    translations: [
      {
        locale: 'en',
        title: 'Smartphones',
        slug: 'smartphones',
        fullPath: 'electronics/smartphones',
        description: 'Mobile phones and smartphones',
      },
      {
        locale: 'hy',
        title: 'Բջջային հեռախոսներ',
        slug: 'smartphones',
        fullPath: 'electronics/smartphones',
        description: 'Բջջային հեռախոսներ և սմարթֆոններ',
      },
    ],
  });
  
  const tablets = await Category.create({
    parentId: electronics._id,
    position: 2,
    published: true,
    translations: [
      {
        locale: 'en',
        title: 'Tablets',
        slug: 'tablets',
        fullPath: 'electronics/tablets',
        description: 'Tablets and iPads',
      },
      {
        locale: 'hy',
        title: 'Պլանշետներ',
        slug: 'tablets',
        fullPath: 'electronics/tablets',
        description: 'Պլանշետներ և iPad-ներ',
      },
    ],
  });
  
  const laptops = await Category.create({
    parentId: electronics._id,
    position: 3,
    published: true,
    translations: [
      {
        locale: 'en',
        title: 'Laptops',
        slug: 'laptops',
        fullPath: 'electronics/laptops',
        description: 'Laptops and notebooks',
      },
      {
        locale: 'hy',
        title: 'Լապտոպներ',
        slug: 'laptops',
        fullPath: 'electronics/laptops',
        description: 'Լապտոպներ և նոութբուքներ',
      },
    ],
  });
  
  const headphones = await Category.create({
    parentId: electronics._id,
    position: 4,
    published: true,
    translations: [
      {
        locale: 'en',
        title: 'Headphones',
        slug: 'headphones',
        fullPath: 'electronics/headphones',
        description: 'Headphones and earphones',
      },
      {
        locale: 'hy',
        title: 'Ականջակալներ',
        slug: 'headphones',
        fullPath: 'electronics/headphones',
        description: 'Ականջակալներ և ականջակալներ',
      },
    ],
  });
  
  const watches = await Category.create({
    parentId: electronics._id,
    position: 5,
    published: true,
    translations: [
      {
        locale: 'en',
        title: 'Smart Watches',
        slug: 'watches',
        fullPath: 'electronics/watches',
        description: 'Smart watches and fitness trackers',
      },
      {
        locale: 'hy',
        title: 'Սմարթ-ժամացույցներ',
        slug: 'watches',
        fullPath: 'electronics/watches',
        description: 'Սմարթ-ժամացույցներ և ֆիտնես-թրեքերներ',
      },
    ],
  });
  
  // Clothing subcategories
  const shoes = await Category.create({
    parentId: clothing._id,
    position: 1,
    published: true,
    translations: [
      {
        locale: 'en',
        title: 'Shoes',
        slug: 'shoes',
        fullPath: 'clothing/shoes',
        description: 'Footwear for all occasions',
      },
      {
        locale: 'hy',
        title: 'Կոշիկ',
        slug: 'shoes',
        fullPath: 'clothing/shoes',
        description: 'Կոշիկ բոլոր առիթների համար',
      },
    ],
  });
  
  const sportswear = await Category.create({
    parentId: clothing._id,
    position: 2,
    published: true,
    translations: [
      {
        locale: 'en',
        title: 'Sportswear',
        slug: 'sportswear',
        fullPath: 'clothing/sportswear',
        description: 'Athletic clothing and gear',
      },
      {
        locale: 'hy',
        title: 'Սպորտային հագուստ',
        slug: 'sportswear',
        fullPath: 'clothing/sportswear',
        description: 'Սպորտային հագուստ և պարագաներ',
      },
    ],
  });
  
  const shirts = await Category.create({
    parentId: clothing._id,
    position: 3,
    published: true,
    translations: [
      {
        locale: 'en',
        title: 'Shirts & Tops',
        slug: 'shirts',
        fullPath: 'clothing/shirts',
        description: 'Shirts, t-shirts and tops',
      },
      {
        locale: 'hy',
        title: 'Շապիկներ և վերնաշապիկներ',
        slug: 'shirts',
        fullPath: 'clothing/shirts',
        description: 'Շապիկներ, տի-շիրտեր և վերնաշապիկներ',
      },
    ],
  });
  
  // Home subcategories
  const furniture = await Category.create({
    parentId: home._id,
    position: 1,
    published: true,
    translations: [
      {
        locale: 'en',
        title: 'Furniture',
        slug: 'furniture',
        fullPath: 'home/furniture',
        description: 'Home furniture and decor',
      },
      {
        locale: 'hy',
        title: 'Կահույք',
        slug: 'furniture',
        fullPath: 'home/furniture',
        description: 'Տան կահույք և դեկոր',
      },
    ],
  });
  
  const kitchen = await Category.create({
    parentId: home._id,
    position: 2,
    published: true,
    translations: [
      {
        locale: 'en',
        title: 'Kitchen',
        slug: 'kitchen',
        fullPath: 'home/kitchen',
        description: 'Kitchen appliances and accessories',
      },
      {
        locale: 'hy',
        title: 'Խոհանոց',
        slug: 'kitchen',
        fullPath: 'home/kitchen',
        description: 'Խոհանոցային տեխնիկա և պարագաներ',
      },
    ],
  });
  
  console.log('✅ Created 15 categories');
  
  // Create category map
  const categoryMap = {
    electronics: electronics._id,
    clothing: clothing._id,
    home: home._id,
    beauty: beauty._id,
    books: books._id,
    smartphones: smartphones._id,
    tablets: tablets._id,
    laptops: laptops._id,
    headphones: headphones._id,
    watches: watches._id,
    shoes: shoes._id,
    sportswear: sportswear._id,
    shirts: shirts._id,
    furniture: furniture._id,
    kitchen: kitchen._id,
  };
  
  return categoryMap;
}

/**
 * Create attributes (Color, Size)
 */
async function createAttributes() {
  console.log('\n🎨 Creating attributes...');
  
  // Color attribute
  const colorAttribute = await Attribute.create({
    key: 'color',
    type: 'select',
    filterable: true,
    position: 1,
    translations: [
      { locale: 'en', name: 'Color' },
      { locale: 'hy', name: 'Գույն' },
    ],
    values: [
      {
        value: 'black',
        position: 1,
        translations: [
          { locale: 'en', label: 'Black' },
          { locale: 'hy', label: 'Սև' },
        ],
      },
      {
        value: 'white',
        position: 2,
        translations: [
          { locale: 'en', label: 'White' },
          { locale: 'hy', label: 'Սպիտակ' },
        ],
      },
      {
        value: 'red',
        position: 3,
        translations: [
          { locale: 'en', label: 'Red' },
          { locale: 'hy', label: 'Կարմիր' },
        ],
      },
      {
        value: 'blue',
        position: 4,
        translations: [
          { locale: 'en', label: 'Blue' },
          { locale: 'hy', label: 'Կապույտ' },
        ],
      },
    ],
  });
  
  // Size attribute
  const sizeAttribute = await Attribute.create({
    key: 'size',
    type: 'select',
    filterable: true,
    position: 2,
    translations: [
      { locale: 'en', name: 'Size' },
      { locale: 'hy', name: 'Չափ' },
    ],
    values: [
      {
        value: 's',
        position: 1,
        translations: [
          { locale: 'en', label: 'S' },
          { locale: 'hy', label: 'S' },
        ],
      },
      {
        value: 'm',
        position: 2,
        translations: [
          { locale: 'en', label: 'M' },
          { locale: 'hy', label: 'M' },
        ],
      },
      {
        value: 'l',
        position: 3,
        translations: [
          { locale: 'en', label: 'L' },
          { locale: 'hy', label: 'L' },
        ],
      },
      {
        value: 'xl',
        position: 4,
        translations: [
          { locale: 'en', label: 'XL' },
          { locale: 'hy', label: 'XL' },
        ],
      },
    ],
  });
  
  console.log('✅ Created 2 attributes (Color, Size)');
  
  return {
    color: colorAttribute._id,
    size: sizeAttribute._id,
    colorAttribute,
    sizeAttribute,
  };
}

/**
 * Create products with variants
 */
async function createProducts(brandMap, categoryMap, attributes) {
  console.log('\n📦 Creating products...');
  
  // Helper function to get Unsplash image URL (100% working)
  const getImageUrl = (keyword, seed = '') => {
    // Using Unsplash Source API - 100% reliable
    const seedParam = seed ? `&sig=${seed}` : '';
    return `https://source.unsplash.com/800x800/?${keyword}${seedParam}`;
  };
  
  const products = [
    // iPhone 15 Pro
    {
      brandId: brandMap.apple,
      skuPrefix: 'IPH15',
      published: true,
      featured: true,
      publishedAt: new Date(),
      categoryIds: [categoryMap.smartphones],
      primaryCategoryId: categoryMap.smartphones,
      attributeIds: [attributes.color],
      translations: [
        {
          locale: 'en',
          title: 'iPhone 15 Pro',
          slug: 'iphone-15-pro',
          subtitle: 'The most advanced iPhone ever',
          descriptionHtml: '<p>The iPhone 15 Pro features a titanium design, A17 Pro chip, and advanced camera system.</p>',
          seoTitle: 'iPhone 15 Pro - Premium Smartphone',
          seoDescription: 'Buy iPhone 15 Pro with titanium design and A17 Pro chip',
        },
        {
          locale: 'hy',
          title: 'iPhone 15 Pro',
          slug: 'iphone-15-pro',
          subtitle: 'Ամենաառաջադեմ iPhone-ը',
          descriptionHtml: '<p>iPhone 15 Pro-ն ունի տիտանի դիզայն, A17 Pro չիպ և առաջադեմ կամերայի համակարգ:</p>',
          seoTitle: 'iPhone 15 Pro - Պրեմիում սմարթֆոն',
          seoDescription: 'Գնեք iPhone 15 Pro տիտանի դիզայնով և A17 Pro չիպով',
        },
      ],
      variants: [
        {
          sku: 'IPH15-PRO-128-BLK',
          price: 899000,
          compareAtPrice: 999000,
          stock: 10,
          imageUrl: getImageUrl('smartphone', 'iphone15black'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'black',
            },
          ],
        },
        {
          sku: 'IPH15-PRO-128-WHT',
          price: 899000,
          compareAtPrice: 999000,
          stock: 8,
          imageUrl: getImageUrl('smartphone', 'iphone15white'),
          position: 2,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'white',
            },
          ],
        },
      ],
    },
    
    // Samsung Galaxy S24
    {
      brandId: brandMap.samsung,
      skuPrefix: 'SGS24',
      published: true,
      featured: true,
      publishedAt: new Date(),
      categoryIds: [categoryMap.smartphones],
      primaryCategoryId: categoryMap.smartphones,
      attributeIds: [attributes.color],
      translations: [
        {
          locale: 'en',
          title: 'Samsung Galaxy S24',
          slug: 'samsung-galaxy-s24',
          subtitle: 'Next-generation Android flagship',
          descriptionHtml: '<p>The Samsung Galaxy S24 features AI-powered features and stunning display.</p>',
          seoTitle: 'Samsung Galaxy S24 - Android Flagship',
          seoDescription: 'Buy Samsung Galaxy S24 with AI features',
        },
        {
          locale: 'hy',
          title: 'Samsung Galaxy S24',
          slug: 'samsung-galaxy-s24',
          subtitle: 'Հաջորդ սերնդի Android ֆլագման',
          descriptionHtml: '<p>Samsung Galaxy S24-ն ունի AI հնարավորություններ և հիասքանչ էկրան:</p>',
          seoTitle: 'Samsung Galaxy S24 - Android ֆլագման',
          seoDescription: 'Գնեք Samsung Galaxy S24 AI հնարավորություններով',
        },
      ],
      variants: [
        {
          sku: 'SGS24-128-BLK',
          price: 699000,
          compareAtPrice: 799000,
          stock: 15,
          imageUrl: getImageUrl('smartphone', 'galaxys24black'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'black',
            },
          ],
        },
        {
          sku: 'SGS24-128-BLU',
          price: 699000,
          compareAtPrice: 799000,
          stock: 12,
          imageUrl: getImageUrl('smartphone', 'galaxys24blue'),
          position: 2,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'blue',
            },
          ],
        },
      ],
    },
    
    // iPad Pro
    {
      brandId: brandMap.apple,
      skuPrefix: 'IPADPRO',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.tablets],
      primaryCategoryId: categoryMap.tablets,
      attributeIds: [attributes.color],
      translations: [
        {
          locale: 'en',
          title: 'iPad Pro 12.9"',
          slug: 'ipad-pro-12-9',
          subtitle: 'Powerful tablet for professionals',
          descriptionHtml: '<p>The iPad Pro features M2 chip and stunning Liquid Retina display.</p>',
          seoTitle: 'iPad Pro - Professional Tablet',
          seoDescription: 'Buy iPad Pro with M2 chip',
        },
        {
          locale: 'hy',
          title: 'iPad Pro 12.9"',
          slug: 'ipad-pro-12-9',
          subtitle: 'Հզոր պլանշետ մասնագետների համար',
          descriptionHtml: '<p>iPad Pro-ն ունի M2 չիպ և հիասքանչ Liquid Retina էկրան:</p>',
          seoTitle: 'iPad Pro - Մասնագիտական պլանշետ',
          seoDescription: 'Գնեք iPad Pro M2 չիպով',
        },
      ],
      variants: [
        {
          sku: 'IPADPRO-256-SLV',
          price: 799000,
          compareAtPrice: 899000,
          stock: 5,
          imageUrl: getImageUrl('tablet', 'ipadpro'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'white',
            },
          ],
        },
      ],
    },
    
    // Nike Air Max
    {
      brandId: brandMap.nike,
      skuPrefix: 'NIKE-AM',
      published: true,
      featured: true,
      publishedAt: new Date(),
      categoryIds: [categoryMap.shoes],
      primaryCategoryId: categoryMap.shoes,
      attributeIds: [attributes.color, attributes.size],
      translations: [
        {
          locale: 'en',
          title: 'Nike Air Max 270',
          slug: 'nike-air-max-270',
          subtitle: 'Comfortable running shoes',
          descriptionHtml: '<p>Nike Air Max 270 features maximum cushioning and comfort.</p>',
          seoTitle: 'Nike Air Max 270 - Running Shoes',
          seoDescription: 'Buy Nike Air Max 270 running shoes',
        },
        {
          locale: 'hy',
          title: 'Nike Air Max 270',
          slug: 'nike-air-max-270',
          subtitle: 'Հարմարավետ վազքի կոշիկ',
          descriptionHtml: '<p>Nike Air Max 270-ն ունի առավելագույն բարձիկավորում և հարմարավետություն:</p>',
          seoTitle: 'Nike Air Max 270 - Վազքի կոշիկ',
          seoDescription: 'Գնեք Nike Air Max 270 վազքի կոշիկ',
        },
      ],
      variants: [
        {
          sku: 'NIKE-AM-270-BLK-42',
          price: 89000,
          compareAtPrice: 99000,
          stock: 20,
          imageUrl: getImageUrl('sneakers', 'nikeairmaxblack'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'black',
            },
            {
              attributeId: attributes.size,
              attributeKey: 'size',
              value: 'm',
            },
          ],
        },
        {
          sku: 'NIKE-AM-270-WHT-42',
          price: 89000,
          compareAtPrice: 99000,
          stock: 18,
          imageUrl: getImageUrl('sneakers', 'nikeairmaxwhite'),
          position: 2,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'white',
            },
            {
              attributeId: attributes.size,
              attributeKey: 'size',
              value: 'm',
            },
          ],
        },
      ],
    },
    
    // Adidas Ultraboost
    {
      brandId: brandMap.adidas,
      skuPrefix: 'ADIDAS-UB',
      published: true,
      featured: true,
      publishedAt: new Date(),
      categoryIds: [categoryMap.shoes],
      primaryCategoryId: categoryMap.shoes,
      attributeIds: [attributes.color, attributes.size],
      translations: [
        {
          locale: 'en',
          title: 'Adidas Ultraboost 22',
          slug: 'adidas-ultraboost-22',
          subtitle: 'Premium running shoes',
          descriptionHtml: '<p>Adidas Ultraboost 22 features Boost technology for maximum energy return.</p>',
          seoTitle: 'Adidas Ultraboost 22 - Running Shoes',
          seoDescription: 'Buy Adidas Ultraboost 22 running shoes',
        },
        {
          locale: 'hy',
          title: 'Adidas Ultraboost 22',
          slug: 'adidas-ultraboost-22',
          subtitle: 'Պրեմիում վազքի կոշիկ',
          descriptionHtml: '<p>Adidas Ultraboost 22-ն ունի Boost տեխնոլոգիա առավելագույն էներգիայի վերադարձի համար:</p>',
          seoTitle: 'Adidas Ultraboost 22 - Վազքի կոշիկ',
          seoDescription: 'Գնեք Adidas Ultraboost 22 վազքի կոշիկ',
        },
      ],
      variants: [
        {
          sku: 'ADIDAS-UB-22-BLK-43',
          price: 95000,
          compareAtPrice: 110000,
          stock: 15,
          imageUrl: getImageUrl('sneakers', 'adidasultraboostblack'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'black',
            },
            {
              attributeId: attributes.size,
              attributeKey: 'size',
              value: 'l',
            },
          ],
        },
        {
          sku: 'ADIDAS-UB-22-WHT-43',
          price: 95000,
          compareAtPrice: 110000,
          stock: 12,
          imageUrl: getImageUrl('sneakers', 'adidasultraboostwhite'),
          position: 2,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'white',
            },
            {
              attributeId: attributes.size,
              attributeKey: 'size',
              value: 'l',
            },
          ],
        },
      ],
    },
    
    // Nike Sportswear
    {
      brandId: brandMap.nike,
      skuPrefix: 'NIKE-SW',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.sportswear],
      primaryCategoryId: categoryMap.sportswear,
      attributeIds: [attributes.size],
      translations: [
        {
          locale: 'en',
          title: 'Nike Dri-FIT T-Shirt',
          slug: 'nike-dri-fit-tshirt',
          subtitle: 'Moisture-wicking athletic shirt',
          descriptionHtml: '<p>Nike Dri-FIT T-Shirt keeps you dry and comfortable during workouts.</p>',
          seoTitle: 'Nike Dri-FIT T-Shirt - Athletic Wear',
          seoDescription: 'Buy Nike Dri-FIT T-Shirt',
        },
        {
          locale: 'hy',
          title: 'Nike Dri-FIT Ֆուտբոլկա',
          slug: 'nike-dri-fit-tshirt',
          subtitle: 'Խոնավություն կլանող սպորտային ֆուտբոլկա',
          descriptionHtml: '<p>Nike Dri-FIT ֆուտբոլկան ձեզ պահում է չոր և հարմարավետ մարզումների ժամանակ:</p>',
          seoTitle: 'Nike Dri-FIT Ֆուտբոլկա - Սպորտային հագուստ',
          seoDescription: 'Գնեք Nike Dri-FIT ֆուտբոլկա',
        },
      ],
      variants: [
        {
          sku: 'NIKE-SW-TS-BLK-M',
          price: 25000,
          compareAtPrice: 30000,
          stock: 30,
          imageUrl: getImageUrl('tshirt', 'niketshirt'),
          position: 1,
          options: [
            {
              attributeId: attributes.size,
              attributeKey: 'size',
              value: 'm',
            },
          ],
        },
        {
          sku: 'NIKE-SW-TS-BLK-L',
          price: 25000,
          compareAtPrice: 30000,
          stock: 25,
          imageUrl: getImageUrl('tshirt', 'niketshirt'),
          position: 2,
          options: [
            {
              attributeId: attributes.size,
              attributeKey: 'size',
              value: 'l',
            },
          ],
        },
      ],
    },
    
    // Adidas Sportswear
    {
      brandId: brandMap.adidas,
      skuPrefix: 'ADIDAS-SW',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.sportswear],
      primaryCategoryId: categoryMap.sportswear,
      attributeIds: [attributes.size],
      translations: [
        {
          locale: 'en',
          title: 'Adidas Climalite T-Shirt',
          slug: 'adidas-climalite-tshirt',
          subtitle: 'Breathable athletic shirt',
          descriptionHtml: '<p>Adidas Climalite T-Shirt provides excellent breathability and comfort.</p>',
          seoTitle: 'Adidas Climalite T-Shirt - Athletic Wear',
          seoDescription: 'Buy Adidas Climalite T-Shirt',
        },
        {
          locale: 'hy',
          title: 'Adidas Climalite Ֆուտբոլկա',
          slug: 'adidas-climalite-tshirt',
          subtitle: 'Օդափոխվող սպորտային ֆուտբոլկա',
          descriptionHtml: '<p>Adidas Climalite ֆուտբոլկան ապահովում է գերազանց օդափոխություն և հարմարավետություն:</p>',
          seoTitle: 'Adidas Climalite Ֆուտբոլկա - Սպորտային հագուստ',
          seoDescription: 'Գնեք Adidas Climalite ֆուտբոլկա',
        },
      ],
      variants: [
        {
          sku: 'ADIDAS-SW-TS-BLU-M',
          price: 28000,
          compareAtPrice: 35000,
          stock: 28,
          imageUrl: getImageUrl('tshirt', 'adidastshirt'),
          position: 1,
          options: [
            {
              attributeId: attributes.size,
              attributeKey: 'size',
              value: 'm',
            },
          ],
        },
        {
          sku: 'ADIDAS-SW-TS-BLU-L',
          price: 28000,
          compareAtPrice: 35000,
          stock: 22,
          imageUrl: getImageUrl('tshirt', 'adidastshirt'),
          position: 2,
          options: [
            {
              attributeId: attributes.size,
              attributeKey: 'size',
              value: 'l',
            },
          ],
        },
      ],
    },
    
    // iPhone 14
    {
      brandId: brandMap.apple,
      skuPrefix: 'IPH14',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.smartphones],
      primaryCategoryId: categoryMap.smartphones,
      attributeIds: [attributes.color],
      translations: [
        {
          locale: 'en',
          title: 'iPhone 14',
          slug: 'iphone-14',
          subtitle: 'Powerful and affordable iPhone',
          descriptionHtml: '<p>iPhone 14 features A15 Bionic chip and advanced camera system.</p>',
          seoTitle: 'iPhone 14 - Affordable Smartphone',
          seoDescription: 'Buy iPhone 14 with A15 Bionic chip',
        },
        {
          locale: 'hy',
          title: 'iPhone 14',
          slug: 'iphone-14',
          subtitle: 'Հզոր և մատչելի iPhone',
          descriptionHtml: '<p>iPhone 14-ն ունի A15 Bionic չիպ և առաջադեմ կամերայի համակարգ:</p>',
          seoTitle: 'iPhone 14 - Մատչելի սմարթֆոն',
          seoDescription: 'Գնեք iPhone 14 A15 Bionic չիպով',
        },
      ],
      variants: [
        {
          sku: 'IPH14-128-BLK',
          price: 599000,
          compareAtPrice: 699000,
          stock: 12,
          imageUrl: getImageUrl('smartphone', 'iphone14black'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'black',
            },
          ],
        },
        {
          sku: 'IPH14-128-RED',
          price: 599000,
          compareAtPrice: 699000,
          stock: 10,
          imageUrl: getImageUrl('smartphone', 'iphone14red'),
          position: 2,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'red',
            },
          ],
        },
      ],
    },
    
    // Samsung Galaxy Tab
    {
      brandId: brandMap.samsung,
      skuPrefix: 'SGTAB',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.tablets],
      primaryCategoryId: categoryMap.tablets,
      attributeIds: [attributes.color],
      translations: [
        {
          locale: 'en',
          title: 'Samsung Galaxy Tab S9',
          slug: 'samsung-galaxy-tab-s9',
          subtitle: 'Premium Android tablet',
          descriptionHtml: '<p>Samsung Galaxy Tab S9 features large display and powerful performance.</p>',
          seoTitle: 'Samsung Galaxy Tab S9 - Android Tablet',
          seoDescription: 'Buy Samsung Galaxy Tab S9',
        },
        {
          locale: 'hy',
          title: 'Samsung Galaxy Tab S9',
          slug: 'samsung-galaxy-tab-s9',
          subtitle: 'Պրեմիում Android պլանշետ',
          descriptionHtml: '<p>Samsung Galaxy Tab S9-ն ունի մեծ էկրան և հզոր արտադրողականություն:</p>',
          seoTitle: 'Samsung Galaxy Tab S9 - Android պլանշետ',
          seoDescription: 'Գնեք Samsung Galaxy Tab S9',
        },
      ],
      variants: [
        {
          sku: 'SGTAB-S9-256-BLK',
          price: 549000,
          compareAtPrice: 649000,
          stock: 8,
          imageUrl: getImageUrl('tablet', 'galaxytab'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'black',
            },
          ],
        },
      ],
    },
    
    // Dell XPS 15 Laptop
    {
      brandId: brandMap.dell,
      skuPrefix: 'DELL-XPS',
      published: true,
      featured: true,
      publishedAt: new Date(),
      categoryIds: [categoryMap.laptops],
      primaryCategoryId: categoryMap.laptops,
      attributeIds: [attributes.color],
      translations: [
        {
          locale: 'en',
          title: 'Dell XPS 15 Laptop',
          slug: 'dell-xps-15',
          subtitle: 'Premium performance laptop',
          descriptionHtml: '<p>Dell XPS 15 features Intel Core i7 processor and stunning 4K display.</p>',
          seoTitle: 'Dell XPS 15 - Premium Laptop',
          seoDescription: 'Buy Dell XPS 15 laptop with Intel Core i7',
        },
        {
          locale: 'hy',
          title: 'Dell XPS 15 Լապտոպ',
          slug: 'dell-xps-15',
          subtitle: 'Պրեմիում արտադրողականության լապտոպ',
          descriptionHtml: '<p>Dell XPS 15-ն ունի Intel Core i7 պրոցեսոր և հիասքանչ 4K էկրան:</p>',
          seoTitle: 'Dell XPS 15 - Պրեմիում լապտոպ',
          seoDescription: 'Գնեք Dell XPS 15 լապտոպ Intel Core i7-ով',
        },
      ],
      variants: [
        {
          sku: 'DELL-XPS-15-512-SLV',
          price: 1299000,
          compareAtPrice: 1499000,
          stock: 8,
          imageUrl: getImageUrl('laptop', 'dellxps'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'white',
            },
          ],
        },
      ],
    },
    
    // Sony WH-1000XM5 Headphones
    {
      brandId: brandMap.sony,
      skuPrefix: 'SONY-WH',
      published: true,
      featured: true,
      publishedAt: new Date(),
      categoryIds: [categoryMap.headphones],
      primaryCategoryId: categoryMap.headphones,
      attributeIds: [attributes.color],
      translations: [
        {
          locale: 'en',
          title: 'Sony WH-1000XM5 Headphones',
          slug: 'sony-wh-1000xm5',
          subtitle: 'Industry-leading noise cancellation',
          descriptionHtml: '<p>Sony WH-1000XM5 features industry-leading noise cancellation and premium sound quality.</p>',
          seoTitle: 'Sony WH-1000XM5 - Premium Headphones',
          seoDescription: 'Buy Sony WH-1000XM5 noise-cancelling headphones',
        },
        {
          locale: 'hy',
          title: 'Sony WH-1000XM5 Ականջակալներ',
          slug: 'sony-wh-1000xm5',
          subtitle: 'Առաջատար աղմուկի ճնշում',
          descriptionHtml: '<p>Sony WH-1000XM5-ն ունի առաջատար աղմուկի ճնշում և պրեմիում ձայնի որակ:</p>',
          seoTitle: 'Sony WH-1000XM5 - Պրեմիում ականջակալներ',
          seoDescription: 'Գնեք Sony WH-1000XM5 աղմուկի ճնշմամբ ականջակալներ',
        },
      ],
      variants: [
        {
          sku: 'SONY-WH-1000XM5-BLK',
          price: 299000,
          compareAtPrice: 349000,
          stock: 15,
          imageUrl: getImageUrl('headphones', 'sonywh1000'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'black',
            },
          ],
        },
      ],
    },
    
    // Apple Watch Series 9
    {
      brandId: brandMap.apple,
      skuPrefix: 'AW-S9',
      published: true,
      featured: true,
      publishedAt: new Date(),
      categoryIds: [categoryMap.watches],
      primaryCategoryId: categoryMap.watches,
      attributeIds: [attributes.color],
      translations: [
        {
          locale: 'en',
          title: 'Apple Watch Series 9',
          slug: 'apple-watch-series-9',
          subtitle: 'The most advanced Apple Watch',
          descriptionHtml: '<p>Apple Watch Series 9 features advanced health tracking and always-on display.</p>',
          seoTitle: 'Apple Watch Series 9 - Smart Watch',
          seoDescription: 'Buy Apple Watch Series 9 with health tracking',
        },
        {
          locale: 'hy',
          title: 'Apple Watch Series 9',
          slug: 'apple-watch-series-9',
          subtitle: 'Ամենաառաջադեմ Apple Watch',
          descriptionHtml: '<p>Apple Watch Series 9-ն ունի առաջադեմ առողջության հետևում և մշտապես միացված էկրան:</p>',
          seoTitle: 'Apple Watch Series 9 - Սմարթ-ժամացույց',
          seoDescription: 'Գնեք Apple Watch Series 9 առողջության հետևմամբ',
        },
      ],
      variants: [
        {
          sku: 'AW-S9-45-BLK',
          price: 399000,
          compareAtPrice: 449000,
          stock: 12,
          imageUrl: getImageUrl('smartwatch', 'applewatch'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'black',
            },
          ],
        },
      ],
    },
    
    // Xiaomi Redmi Note 13
    {
      brandId: brandMap.xiaomi,
      skuPrefix: 'XIAOMI-RN',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.smartphones],
      primaryCategoryId: categoryMap.smartphones,
      attributeIds: [attributes.color],
      translations: [
        {
          locale: 'en',
          title: 'Xiaomi Redmi Note 13',
          slug: 'xiaomi-redmi-note-13',
          subtitle: 'Affordable flagship features',
          descriptionHtml: '<p>Xiaomi Redmi Note 13 offers flagship features at an affordable price.</p>',
          seoTitle: 'Xiaomi Redmi Note 13 - Budget Smartphone',
          seoDescription: 'Buy Xiaomi Redmi Note 13 smartphone',
        },
        {
          locale: 'hy',
          title: 'Xiaomi Redmi Note 13',
          slug: 'xiaomi-redmi-note-13',
          subtitle: 'Մատչելի ֆլագման հնարավորություններ',
          descriptionHtml: '<p>Xiaomi Redmi Note 13-ը առաջարկում է ֆլագման հնարավորություններ մատչելի գնով:</p>',
          seoTitle: 'Xiaomi Redmi Note 13 - Բյուջետային սմարթֆոն',
          seoDescription: 'Գնեք Xiaomi Redmi Note 13 սմարթֆոն',
        },
      ],
      variants: [
        {
          sku: 'XIAOMI-RN-13-128-BLU',
          price: 199000,
          compareAtPrice: 249000,
          stock: 20,
          imageUrl: getImageUrl('smartphone', 'xiaomiredmi'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'blue',
            },
          ],
        },
      ],
    },
    
    // Puma RS-X Sneakers
    {
      brandId: brandMap.puma,
      skuPrefix: 'PUMA-RSX',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.shoes],
      primaryCategoryId: categoryMap.shoes,
      attributeIds: [attributes.color, attributes.size],
      translations: [
        {
          locale: 'en',
          title: 'Puma RS-X Sneakers',
          slug: 'puma-rs-x-sneakers',
          subtitle: 'Retro-inspired design',
          descriptionHtml: '<p>Puma RS-X features retro-inspired design with modern comfort technology.</p>',
          seoTitle: 'Puma RS-X - Retro Sneakers',
          seoDescription: 'Buy Puma RS-X retro sneakers',
        },
        {
          locale: 'hy',
          title: 'Puma RS-X Կոշիկ',
          slug: 'puma-rs-x-sneakers',
          subtitle: 'Ռետրո ոճի դիզայն',
          descriptionHtml: '<p>Puma RS-X-ն ունի ռետրո ոճի դիզայն ժամանակակից հարմարավետության տեխնոլոգիայով:</p>',
          seoTitle: 'Puma RS-X - Ռետրո կոշիկ',
          seoDescription: 'Գնեք Puma RS-X ռետրո կոշիկ',
        },
      ],
      variants: [
        {
          sku: 'PUMA-RSX-BLK-42',
          price: 75000,
          compareAtPrice: 85000,
          stock: 18,
          imageUrl: getImageUrl('sneakers', 'pumarsx'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'black',
            },
            {
              attributeId: attributes.size,
              attributeKey: 'size',
              value: 'm',
            },
          ],
        },
      ],
    },
    
    // L\'Oreal Paris Foundation
    {
      brandId: brandMap.loreal,
      skuPrefix: 'LOREAL-FND',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.beauty],
      primaryCategoryId: categoryMap.beauty,
      attributeIds: [],
      translations: [
        {
          locale: 'en',
          title: 'L\'Oreal Paris True Match Foundation',
          slug: 'loreal-true-match-foundation',
          subtitle: 'Natural finish foundation',
          descriptionHtml: '<p>L\'Oreal Paris True Match Foundation provides natural finish with perfect coverage.</p>',
          seoTitle: 'L\'Oreal True Match Foundation - Makeup',
          seoDescription: 'Buy L\'Oreal True Match Foundation',
        },
        {
          locale: 'hy',
          title: 'L\'Oreal Paris True Match Foundation',
          slug: 'loreal-true-match-foundation',
          subtitle: 'Բնական ավարտի foundation',
          descriptionHtml: '<p>L\'Oreal Paris True Match Foundation-ը ապահովում է բնական ավարտ կատարյալ ծածկույթով:</p>',
          seoTitle: 'L\'Oreal True Match Foundation - Մեյք-ափ',
          seoDescription: 'Գնեք L\'Oreal True Match Foundation',
        },
      ],
      variants: [
        {
          sku: 'LOREAL-FND-30ML',
          price: 15000,
          compareAtPrice: 18000,
          stock: 35,
          imageUrl: getImageUrl('makeup', 'lorealfoundation'),
          position: 1,
          options: [],
        },
      ],
    },
    
    // Modern Sofa
    {
      brandId: null,
      skuPrefix: 'SOFA-MOD',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.furniture],
      primaryCategoryId: categoryMap.furniture,
      attributeIds: [attributes.color],
      translations: [
        {
          locale: 'en',
          title: 'Modern Comfort Sofa',
          slug: 'modern-comfort-sofa',
          subtitle: 'Elegant living room centerpiece',
          descriptionHtml: '<p>Modern Comfort Sofa features elegant design and premium comfort for your living room.</p>',
          seoTitle: 'Modern Comfort Sofa - Furniture',
          seoDescription: 'Buy Modern Comfort Sofa for living room',
        },
        {
          locale: 'hy',
          title: 'Ժամանակակից Հարմարավետ Բազմոց',
          slug: 'modern-comfort-sofa',
          subtitle: 'Էլեգանտ հյուրասենյակի կենտրոնական տարր',
          descriptionHtml: '<p>Ժամանակակից Հարմարավետ Բազմոցը ունի էլեգանտ դիզայն և պրեմիում հարմարավետություն ձեր հյուրասենյակի համար:</p>',
          seoTitle: 'Ժամանակակից Հարմարավետ Բազմոց - Կահույք',
          seoDescription: 'Գնեք Ժամանակակից Հարմարավետ Բազմոց հյուրասենյակի համար',
        },
      ],
      variants: [
        {
          sku: 'SOFA-MOD-GRY',
          price: 450000,
          compareAtPrice: 550000,
          stock: 5,
          imageUrl: getImageUrl('sofa', 'modernsofa'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'black',
            },
          ],
        },
      ],
    },
    
    // Coffee Maker
    {
      brandId: null,
      skuPrefix: 'COFFEE-MKR',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.kitchen],
      primaryCategoryId: categoryMap.kitchen,
      attributeIds: [attributes.color],
      translations: [
        {
          locale: 'en',
          title: 'Premium Coffee Maker',
          slug: 'premium-coffee-maker',
          subtitle: 'Perfect morning coffee',
          descriptionHtml: '<p>Premium Coffee Maker brews perfect coffee with programmable settings.</p>',
          seoTitle: 'Premium Coffee Maker - Kitchen Appliance',
          seoDescription: 'Buy Premium Coffee Maker',
        },
        {
          locale: 'hy',
          title: 'Պրեմիում Սրճարան',
          slug: 'premium-coffee-maker',
          subtitle: 'Կատարյալ առավոտյան սուրճ',
          descriptionHtml: '<p>Պրեմիում Սրճարանը պատրաստում է կատարյալ սուրճ ծրագրավորվող կարգավորումներով:</p>',
          seoTitle: 'Պրեմիում Սրճարան - Խոհանոցային տեխնիկա',
          seoDescription: 'Գնեք Պրեմիում Սրճարան',
        },
      ],
      variants: [
        {
          sku: 'COFFEE-MKR-BLK',
          price: 85000,
          compareAtPrice: 100000,
          stock: 12,
          imageUrl: getImageUrl('coffee', 'coffeemaker'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'black',
            },
          ],
        },
      ],
    },
    
    // Classic Novel Book
    {
      brandId: null,
      skuPrefix: 'BOOK-CLS',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.books],
      primaryCategoryId: categoryMap.books,
      attributeIds: [],
      translations: [
        {
          locale: 'en',
          title: 'Classic Literature Collection',
          slug: 'classic-literature-collection',
          subtitle: 'Timeless stories and wisdom',
          descriptionHtml: '<p>Classic Literature Collection features timeless stories from world-renowned authors.</p>',
          seoTitle: 'Classic Literature Collection - Books',
          seoDescription: 'Buy Classic Literature Collection',
        },
        {
          locale: 'hy',
          title: 'Դասական Գրականության Հավաքածու',
          slug: 'classic-literature-collection',
          subtitle: 'Անժամանակ պատմություններ և իմաստություն',
          descriptionHtml: '<p>Դասական Գրականության Հավաքածուն ներառում է անժամանակ պատմություններ աշխարհահռչակ հեղինակներից:</p>',
          seoTitle: 'Դասական Գրականության Հավաքածու - Գրքեր',
          seoDescription: 'Գնեք Դասական Գրականության Հավաքածու',
        },
      ],
      variants: [
        {
          sku: 'BOOK-CLS-HB',
          price: 12000,
          compareAtPrice: 15000,
          stock: 50,
          imageUrl: getImageUrl('book', 'classicbook'),
          position: 1,
          options: [],
        },
      ],
    },
    
    // Samsung Galaxy Watch
    {
      brandId: brandMap.samsung,
      skuPrefix: 'SGWATCH',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.watches],
      primaryCategoryId: categoryMap.watches,
      attributeIds: [attributes.color],
      translations: [
        {
          locale: 'en',
          title: 'Samsung Galaxy Watch 6',
          slug: 'samsung-galaxy-watch-6',
          subtitle: 'Advanced fitness tracking',
          descriptionHtml: '<p>Samsung Galaxy Watch 6 features advanced fitness tracking and health monitoring.</p>',
          seoTitle: 'Samsung Galaxy Watch 6 - Smart Watch',
          seoDescription: 'Buy Samsung Galaxy Watch 6',
        },
        {
          locale: 'hy',
          title: 'Samsung Galaxy Watch 6',
          slug: 'samsung-galaxy-watch-6',
          subtitle: 'Առաջադեմ ֆիտնես հետևում',
          descriptionHtml: '<p>Samsung Galaxy Watch 6-ն ունի առաջադեմ ֆիտնես հետևում և առողջության մոնիտորինգ:</p>',
          seoTitle: 'Samsung Galaxy Watch 6 - Սմարթ-ժամացույց',
          seoDescription: 'Գնեք Samsung Galaxy Watch 6',
        },
      ],
      variants: [
        {
          sku: 'SGWATCH-6-44-BLK',
          price: 249000,
          compareAtPrice: 299000,
          stock: 10,
          imageUrl: getImageUrl('smartwatch', 'galaxywatch'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'black',
            },
          ],
        },
      ],
    },
    
    // MacBook Pro
    {
      brandId: brandMap.apple,
      skuPrefix: 'MBP-16',
      published: true,
      featured: true,
      publishedAt: new Date(),
      categoryIds: [categoryMap.laptops],
      primaryCategoryId: categoryMap.laptops,
      attributeIds: [attributes.color],
      translations: [
        {
          locale: 'en',
          title: 'MacBook Pro 16"',
          slug: 'macbook-pro-16',
          subtitle: 'Professional performance',
          descriptionHtml: '<p>MacBook Pro 16" features M3 Pro chip and stunning Liquid Retina XDR display.</p>',
          seoTitle: 'MacBook Pro 16" - Professional Laptop',
          seoDescription: 'Buy MacBook Pro 16" with M3 Pro chip',
        },
        {
          locale: 'hy',
          title: 'MacBook Pro 16"',
          slug: 'macbook-pro-16',
          subtitle: 'Մասնագիտական արտադրողականություն',
          descriptionHtml: '<p>MacBook Pro 16"-ն ունի M3 Pro չիպ և հիասքանչ Liquid Retina XDR էկրան:</p>',
          seoTitle: 'MacBook Pro 16" - Մասնագիտական լապտոպ',
          seoDescription: 'Գնեք MacBook Pro 16" M3 Pro չիպով',
        },
      ],
      variants: [
        {
          sku: 'MBP-16-1TB-SLV',
          price: 1999000,
          compareAtPrice: 2299000,
          stock: 6,
          imageUrl: getImageUrl('laptop', 'macbookpro'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'white',
            },
          ],
        },
      ],
    },
    
    // AirPods Pro
    {
      brandId: brandMap.apple,
      skuPrefix: 'AIRPODS-PRO',
      published: true,
      featured: true,
      publishedAt: new Date(),
      categoryIds: [categoryMap.headphones],
      primaryCategoryId: categoryMap.headphones,
      attributeIds: [],
      translations: [
        {
          locale: 'en',
          title: 'AirPods Pro (2nd Gen)',
          slug: 'airpods-pro-2',
          subtitle: 'Active Noise Cancellation',
          descriptionHtml: '<p>AirPods Pro features Active Noise Cancellation and Spatial Audio.</p>',
          seoTitle: 'AirPods Pro - Wireless Earbuds',
          seoDescription: 'Buy AirPods Pro with noise cancellation',
        },
        {
          locale: 'hy',
          title: 'AirPods Pro (2-րդ սերունդ)',
          slug: 'airpods-pro-2',
          subtitle: 'Ակտիվ աղմուկի ճնշում',
          descriptionHtml: '<p>AirPods Pro-ն ունի Ակտիվ աղմուկի ճնշում և Spatial Audio:</p>',
          seoTitle: 'AirPods Pro - Անլար ականջակալներ',
          seoDescription: 'Գնեք AirPods Pro աղմուկի ճնշմամբ',
        },
      ],
      variants: [
        {
          sku: 'AIRPODS-PRO-2',
          price: 199000,
          compareAtPrice: 229000,
          stock: 25,
          imageUrl: getImageUrl('earbuds', 'airpods'),
          position: 1,
          options: [],
        },
      ],
    },
    
    // Nike Basketball Shoes
    {
      brandId: brandMap.nike,
      skuPrefix: 'NIKE-BB',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.shoes],
      primaryCategoryId: categoryMap.shoes,
      attributeIds: [attributes.color, attributes.size],
      translations: [
        {
          locale: 'en',
          title: 'Nike LeBron Basketball Shoes',
          slug: 'nike-lebron-basketball',
          subtitle: 'Elite performance on court',
          descriptionHtml: '<p>Nike LeBron Basketball Shoes designed for elite performance on the court.</p>',
          seoTitle: 'Nike LeBron Basketball Shoes - Sports',
          seoDescription: 'Buy Nike LeBron Basketball Shoes',
        },
        {
          locale: 'hy',
          title: 'Nike LeBron Բասկետբոլային Կոշիկ',
          slug: 'nike-lebron-basketball',
          subtitle: 'Էլիտային արտադրողականություն մարզադաշտում',
          descriptionHtml: '<p>Nike LeBron Բասկետբոլային Կոշիկը նախագծված է էլիտային արտադրողականության համար մարզադաշտում:</p>',
          seoTitle: 'Nike LeBron Բասկետբոլային Կոշիկ - Սպորտ',
          seoDescription: 'Գնեք Nike LeBron Բասկետբոլային Կոշիկ',
        },
      ],
      variants: [
        {
          sku: 'NIKE-BB-LBJ-44',
          price: 120000,
          compareAtPrice: 140000,
          stock: 15,
          imageUrl: getImageUrl('basketball', 'nikelebron'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'red',
            },
            {
              attributeId: attributes.size,
              attributeKey: 'size',
              value: 'l',
            },
          ],
        },
      ],
    },
    
    // Adidas Originals Hoodie
    {
      brandId: brandMap.adidas,
      skuPrefix: 'ADIDAS-HD',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.sportswear],
      primaryCategoryId: categoryMap.sportswear,
      attributeIds: [attributes.size],
      translations: [
        {
          locale: 'en',
          title: 'Adidas Originals Hoodie',
          slug: 'adidas-originals-hoodie',
          subtitle: 'Classic streetwear style',
          descriptionHtml: '<p>Adidas Originals Hoodie features classic streetwear style with premium comfort.</p>',
          seoTitle: 'Adidas Originals Hoodie - Streetwear',
          seoDescription: 'Buy Adidas Originals Hoodie',
        },
        {
          locale: 'hy',
          title: 'Adidas Originals Հուդի',
          slug: 'adidas-originals-hoodie',
          subtitle: 'Դասական փողոցային ոճ',
          descriptionHtml: '<p>Adidas Originals Հուդին ունի դասական փողոցային ոճ պրեմիում հարմարավետությամբ:</p>',
          seoTitle: 'Adidas Originals Հուդի - Փողոցային հագուստ',
          seoDescription: 'Գնեք Adidas Originals Հուդի',
        },
      ],
      variants: [
        {
          sku: 'ADIDAS-HD-BLK-M',
          price: 45000,
          compareAtPrice: 55000,
          stock: 22,
          imageUrl: getImageUrl('hoodie', 'adidashoodie'),
          position: 1,
          options: [
            {
              attributeId: attributes.size,
              attributeKey: 'size',
              value: 'm',
            },
          ],
        },
        {
          sku: 'ADIDAS-HD-BLK-L',
          price: 45000,
          compareAtPrice: 55000,
          stock: 18,
          imageUrl: getImageUrl('hoodie', 'adidashoodie'),
          position: 2,
          options: [
            {
              attributeId: attributes.size,
              attributeKey: 'size',
              value: 'l',
            },
          ],
        },
      ],
    },
    
    // Xiaomi Mi Pad 6
    {
      brandId: brandMap.xiaomi,
      skuPrefix: 'XIAOMI-PAD',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.tablets],
      primaryCategoryId: categoryMap.tablets,
      attributeIds: [attributes.color],
      translations: [
        {
          locale: 'en',
          title: 'Xiaomi Mi Pad 6',
          slug: 'xiaomi-mi-pad-6',
          subtitle: 'Affordable premium tablet',
          descriptionHtml: '<p>Xiaomi Mi Pad 6 offers premium features at an affordable price point.</p>',
          seoTitle: 'Xiaomi Mi Pad 6 - Budget Tablet',
          seoDescription: 'Buy Xiaomi Mi Pad 6 tablet',
        },
        {
          locale: 'hy',
          title: 'Xiaomi Mi Pad 6',
          slug: 'xiaomi-mi-pad-6',
          subtitle: 'Մատչելի պրեմիում պլանշետ',
          descriptionHtml: '<p>Xiaomi Mi Pad 6-ը առաջարկում է պրեմիում հնարավորություններ մատչելի գնով:</p>',
          seoTitle: 'Xiaomi Mi Pad 6 - Բյուջետային պլանշետ',
          seoDescription: 'Գնեք Xiaomi Mi Pad 6 պլանշետ',
        },
      ],
      variants: [
        {
          sku: 'XIAOMI-PAD-6-128-BLU',
          price: 179000,
          compareAtPrice: 219000,
          stock: 14,
          imageUrl: getImageUrl('tablet', 'xiaomipad'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'blue',
            },
          ],
        },
      ],
    },
    
    // L\'Oreal Mascara
    {
      brandId: brandMap.loreal,
      skuPrefix: 'LOREAL-MSC',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.beauty],
      primaryCategoryId: categoryMap.beauty,
      attributeIds: [],
      translations: [
        {
          locale: 'en',
          title: 'L\'Oreal Voluminous Mascara',
          slug: 'loreal-voluminous-mascara',
          subtitle: 'Dramatic lashes',
          descriptionHtml: '<p>L\'Oreal Voluminous Mascara creates dramatic, voluminous lashes.</p>',
          seoTitle: 'L\'Oreal Voluminous Mascara - Makeup',
          seoDescription: 'Buy L\'Oreal Voluminous Mascara',
        },
        {
          locale: 'hy',
          title: 'L\'Oreal Voluminous Mascara',
          slug: 'loreal-voluminous-mascara',
          subtitle: 'Դրամատիկ թարթիչներ',
          descriptionHtml: '<p>L\'Oreal Voluminous Mascara-ն ստեղծում է դրամատիկ, ծավալուն թարթիչներ:</p>',
          seoTitle: 'L\'Oreal Voluminous Mascara - Մեյք-ափ',
          seoDescription: 'Գնեք L\'Oreal Voluminous Mascara',
        },
      ],
      variants: [
        {
          sku: 'LOREAL-MSC-BLK',
          price: 8500,
          compareAtPrice: 10000,
          stock: 40,
          imageUrl: getImageUrl('mascara', 'lorealmascara'),
          position: 1,
          options: [],
        },
      ],
    },
    
    // Dining Table Set
    {
      brandId: null,
      skuPrefix: 'TABLE-DIN',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.furniture],
      primaryCategoryId: categoryMap.furniture,
      attributeIds: [],
      translations: [
        {
          locale: 'en',
          title: 'Modern Dining Table Set',
          slug: 'modern-dining-table-set',
          subtitle: 'Elegant dining experience',
          descriptionHtml: '<p>Modern Dining Table Set creates an elegant dining experience for your family.</p>',
          seoTitle: 'Modern Dining Table Set - Furniture',
          seoDescription: 'Buy Modern Dining Table Set',
        },
        {
          locale: 'hy',
          title: 'Ժամանակակից Ճաշասեղանի Հավաքածու',
          slug: 'modern-dining-table-set',
          subtitle: 'Էլեգանտ ճաշի փորձ',
          descriptionHtml: '<p>Ժամանակակից Ճաշասեղանի Հավաքածուն ստեղծում է էլեգանտ ճաշի փորձ ձեր ընտանիքի համար:</p>',
          seoTitle: 'Ժամանակակից Ճաշասեղանի Հավաքածու - Կահույք',
          seoDescription: 'Գնեք Ժամանակակից Ճաշասեղանի Հավաքածու',
        },
      ],
      variants: [
        {
          sku: 'TABLE-DIN-6P',
          price: 350000,
          compareAtPrice: 420000,
          stock: 7,
          imageUrl: getImageUrl('dining', 'diningtable'),
          position: 1,
          options: [],
        },
      ],
    },
    
    // Blender
    {
      brandId: null,
      skuPrefix: 'BLENDER-PRM',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.kitchen],
      primaryCategoryId: categoryMap.kitchen,
      attributeIds: [attributes.color],
      translations: [
        {
          locale: 'en',
          title: 'Premium Blender',
          slug: 'premium-blender',
          subtitle: 'Powerful blending performance',
          descriptionHtml: '<p>Premium Blender features powerful motor for smooth blending of all ingredients.</p>',
          seoTitle: 'Premium Blender - Kitchen Appliance',
          seoDescription: 'Buy Premium Blender',
        },
        {
          locale: 'hy',
          title: 'Պրեմիում Բլենդեր',
          slug: 'premium-blender',
          subtitle: 'Հզոր խառնման արտադրողականություն',
          descriptionHtml: '<p>Պրեմիում Բլենդերը ունի հզոր շարժիչ բոլոր բաղադրիչների հարթ խառնման համար:</p>',
          seoTitle: 'Պրեմիում Բլենդեր - Խոհանոցային տեխնիկա',
          seoDescription: 'Գնեք Պրեմիում Բլենդեր',
        },
      ],
      variants: [
        {
          sku: 'BLENDER-PRM-RED',
          price: 65000,
          compareAtPrice: 80000,
          stock: 16,
          imageUrl: getImageUrl('blender', 'premiumblender'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'red',
            },
          ],
        },
      ],
    },
    
    // Science Fiction Book
    {
      brandId: null,
      skuPrefix: 'BOOK-SF',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.books],
      primaryCategoryId: categoryMap.books,
      attributeIds: [],
      translations: [
        {
          locale: 'en',
          title: 'Science Fiction Masterpiece',
          slug: 'science-fiction-masterpiece',
          subtitle: 'Epic space adventures',
          descriptionHtml: '<p>Science Fiction Masterpiece takes you on epic space adventures across the galaxy.</p>',
          seoTitle: 'Science Fiction Masterpiece - Books',
          seoDescription: 'Buy Science Fiction Masterpiece',
        },
        {
          locale: 'hy',
          title: 'Գիտաֆանտաստիկ Գլուխգործոց',
          slug: 'science-fiction-masterpiece',
          subtitle: 'Էպիկական տիեզերական արկածներ',
          descriptionHtml: '<p>Գիտաֆանտաստիկ Գլուխգործոցը ձեզ տանում է էպիկական տիեզերական արկածների գալակտիկայով:</p>',
          seoTitle: 'Գիտաֆանտաստիկ Գլուխգործոց - Գրքեր',
          seoDescription: 'Գնեք Գիտաֆանտաստիկ Գլուխգործոց',
        },
      ],
      variants: [
        {
          sku: 'BOOK-SF-PB',
          price: 8000,
          compareAtPrice: 10000,
          stock: 60,
          imageUrl: getImageUrl('book', 'scifibook'),
          position: 1,
          options: [],
        },
      ],
    },
    
    // Puma Training Shorts
    {
      brandId: brandMap.puma,
      skuPrefix: 'PUMA-SH',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.sportswear],
      primaryCategoryId: categoryMap.sportswear,
      attributeIds: [attributes.size],
      translations: [
        {
          locale: 'en',
          title: 'Puma Training Shorts',
          slug: 'puma-training-shorts',
          subtitle: 'Comfortable workout gear',
          descriptionHtml: '<p>Puma Training Shorts provide comfort and flexibility during workouts.</p>',
          seoTitle: 'Puma Training Shorts - Sportswear',
          seoDescription: 'Buy Puma Training Shorts',
        },
        {
          locale: 'hy',
          title: 'Puma Մարզական Շորտեր',
          slug: 'puma-training-shorts',
          subtitle: 'Հարմարավետ մարզական պարագաներ',
          descriptionHtml: '<p>Puma Մարզական Շորտերը ապահովում են հարմարավետություն և ճկունություն մարզումների ժամանակ:</p>',
          seoTitle: 'Puma Մարզական Շորտեր - Սպորտային հագուստ',
          seoDescription: 'Գնեք Puma Մարզական Շորտեր',
        },
      ],
      variants: [
        {
          sku: 'PUMA-SH-BLK-M',
          price: 18000,
          compareAtPrice: 22000,
          stock: 30,
          imageUrl: getImageUrl('shorts', 'pumashorts'),
          position: 1,
          options: [
            {
              attributeId: attributes.size,
              attributeKey: 'size',
              value: 'm',
            },
          ],
        },
      ],
    },
    
    // Casual Shirt
    {
      brandId: null,
      skuPrefix: 'SHIRT-CSL',
      published: true,
      featured: false,
      publishedAt: new Date(),
      categoryIds: [categoryMap.shirts],
      primaryCategoryId: categoryMap.shirts,
      attributeIds: [attributes.color, attributes.size],
      translations: [
        {
          locale: 'en',
          title: 'Classic Casual Shirt',
          slug: 'classic-casual-shirt',
          subtitle: 'Versatile everyday wear',
          descriptionHtml: '<p>Classic Casual Shirt offers versatile style for everyday wear.</p>',
          seoTitle: 'Classic Casual Shirt - Clothing',
          seoDescription: 'Buy Classic Casual Shirt',
        },
        {
          locale: 'hy',
          title: 'Դասական Կազուալ Շապիկ',
          slug: 'classic-casual-shirt',
          subtitle: 'Բազմակողմանի ամենօրյա հագուստ',
          descriptionHtml: '<p>Դասական Կազուալ Շապիկը առաջարկում է բազմակողմանի ոճ ամենօրյա հագուստի համար:</p>',
          seoTitle: 'Դասական Կազուալ Շապիկ - Հագուստ',
          seoDescription: 'Գնեք Դասական Կազուալ Շապիկ',
        },
      ],
      variants: [
        {
          sku: 'SHIRT-CSL-WHT-M',
          price: 22000,
          compareAtPrice: 28000,
          stock: 25,
          imageUrl: getImageUrl('shirt', 'casualshirt'),
          position: 1,
          options: [
            {
              attributeId: attributes.color,
              attributeKey: 'color',
              value: 'white',
            },
            {
              attributeId: attributes.size,
              attributeKey: 'size',
              value: 'm',
            },
          ],
        },
      ],
    },
  ];
  
  const createdProducts = await Product.insertMany(products);
  console.log(`✅ Created ${createdProducts.length} products with variants`);
  
  return createdProducts;
}

/**
 * Main seed function
 */
async function seed() {
  try {
    console.log('🌱 Starting database seed...\n');
    
    // Connect to database
    console.log('🔌 Connecting to MongoDB...');
    await connectDB();
    console.log('✅ Connected to MongoDB\n');
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    await clearDatabase();
    
    // Create users
    const { adminUser, testUser } = await createUsers();
    
    // Create brands
    const brandMap = await createBrands();
    
    // Create categories
    const categoryMap = await createCategories();
    
    // Create attributes
    const attributes = await createAttributes();
    
    // Create products
    const products = await createProducts(brandMap, categoryMap, attributes);
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('✅ Database seed completed successfully!');
    console.log('='.repeat(50));
    console.log('\n📊 Summary:');
    console.log(`   👤 Users: 2 (admin@shop.am, test@shop.am)`);
    console.log(`   🏷️  Brands: 9 (Apple, Samsung, Nike, Adidas, Dell, Sony, Xiaomi, Puma, L'Oreal)`);
    console.log(`   📁 Categories: 15 (with hierarchy)`);
    console.log(`   🎨 Attributes: 2 (Color, Size)`);
    console.log(`   📦 Products: ${products.length} (with variants and 100% working image URLs)`);
    console.log('\n🔐 Login credentials:');
    console.log('   Admin: admin@shop.am / admin123');
    console.log('   Test:  test@shop.am / test123');
    console.log('\n');
    
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    console.error('Stack trace:', error.stack);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run seed
seed();


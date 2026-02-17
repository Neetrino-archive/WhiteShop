'use client';

import { useState, useEffect, Suspense, useRef, useMemo } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../../lib/auth/AuthContext';
import { Card, Button, Input } from '@shop/ui';
import { apiClient } from '../../../../lib/api-client';
import { getColorHex } from '../../../../lib/colorMap';
import { useTranslation } from '../../../../lib/i18n-client';
import { convertPrice, CURRENCIES, type CurrencyCode } from '../../../../lib/currency';
import {
  smartSplitUrls,
  cleanImageUrls,
  separateMainAndVariantImages,
  processImageFile,
} from '../../../../lib/utils/image-utils';
import type { Brand, Category, Attribute, ColorData, Variant, ProductLabel, ProductData, GeneratedVariant } from './types';
import { BasicInformation } from './components/BasicInformation';
import { ProductImages } from './components/ProductImages';
import { CategoriesBrands } from './components/CategoriesBrands';
import { SimpleProductFields } from './components/SimpleProductFields';
import { AttributesSelection } from './components/AttributesSelection';
import { VariantBuilder } from './components/VariantBuilder';
import { ProductLabels } from './components/ProductLabels';
import { ValueSelectionModal } from './components/ValueSelectionModal';
import { Publishing } from './components/Publishing';
import { FormActions } from './components/FormActions';
import { PageHeader } from './components/PageHeader';
import { useLabelManagement } from './hooks/useLabelManagement';
import { useImageHandling } from './hooks/useImageHandling';
import { useVariantGeneration } from './hooks/useVariantGeneration';
import { useProductDataLoading } from './hooks/useProductDataLoading';
import { useProductEditMode } from './hooks/useProductEditMode';
import { useProductVariantConversion } from './hooks/useProductVariantConversion';
import { useProductAttributeHandlers } from './hooks/useProductAttributeHandlers';
import { useProductFormHandlers } from './hooks/useProductFormHandlers';
import { generateSlug, isClothingCategory as checkIsClothingCategory } from './utils/productUtils';

function AddProductPageContent() {
  const { t } = useTranslation();
  const { isLoggedIn, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const isEditMode = !!productId;
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    descriptionHtml: '',
    brandIds: [] as string[], // Changed to array for multi-select
    primaryCategoryId: '',
    categoryIds: [] as string[],
    published: false,
    featured: false,
    imageUrls: [] as string[],
    featuredImageIndex: 0,
    mainProductImage: '' as string, // Main product image (base64)
    variants: [] as Variant[],
    labels: [] as ProductLabel[],
  });
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [brandsExpanded, setBrandsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const variantImageInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const attributesDropdownRef = useRef<HTMLDivElement | null>(null);
  const [attributesDropdownOpen, setAttributesDropdownOpen] = useState(false);
  const [colorImageTarget, setColorImageTarget] = useState<{ variantId: string; colorValue: string } | null>(null);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [newBrandName, setNewBrandName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [useNewBrand, setUseNewBrand] = useState(false);
  const [useNewCategory, setUseNewCategory] = useState(false);
  // Attribute handlers state moved to hook
  // Default currency from settings
  const [defaultCurrency, setDefaultCurrency] = useState<CurrencyCode>('AMD');
  
  // Product Type: 'simple' or 'variable' (default: 'variable')
  const [productType, setProductType] = useState<'simple' | 'variable'>('variable');
  // Simple product fields (only used when productType === 'simple')
  const [simpleProductData, setSimpleProductData] = useState({
    price: '',
    compareAtPrice: '',
    sku: '',
    quantity: '',
  });
  // New Multi-Attribute Variant Builder state
  const [selectedAttributesForVariants, setSelectedAttributesForVariants] = useState<Set<string>>(new Set()); // Selected attribute IDs
  const [selectedAttributeValueIds, setSelectedAttributeValueIds] = useState<Record<string, string[]>>({}); // Key: attributeId, Value: array of selected value IDs
  // State for managing value selection modal
  const [openValueModal, setOpenValueModal] = useState<{ variantId: string; attributeId: string } | null>(null);
  const [generatedVariants, setGeneratedVariants] = useState<GeneratedVariant[]>([]);
  // Track if we're loading variants in edit mode (to show table immediately)
  const [hasVariantsToLoad, setHasVariantsToLoad] = useState(false);

  // Use data loading hook
  useProductDataLoading({
    isLoggedIn,
    isAdmin,
    isLoading,
    setBrands,
    setCategories,
    setAttributes,
    setDefaultCurrency,
    attributesDropdownOpen,
    setAttributesDropdownOpen,
    attributesDropdownRef,
    categoriesExpanded,
    setCategoriesExpanded,
    brandsExpanded,
    setBrandsExpanded,
  });

  // Use edit mode hook
  useProductEditMode({
    productId,
    isLoggedIn,
    isAdmin,
    attributes,
    defaultCurrency,
    setLoadingProduct,
    setFormData,
    setUseNewBrand,
    setUseNewCategory,
    setNewBrandName,
    setNewCategoryName,
    setHasVariantsToLoad,
    setProductType,
    setSimpleProductData,
  });

  // Use variant conversion hook
  useProductVariantConversion({
    productId,
    attributes,
    defaultCurrency,
    setSelectedAttributesForVariants,
    setSelectedAttributeValueIds,
    setGeneratedVariants,
    setHasVariantsToLoad,
  });

  // Variant generation using hook
  const { applyToAllVariants } = useVariantGeneration({
    selectedAttributesForVariants,
    selectedAttributeValueIds,
    attributes,
    generatedVariants,
    formDataSlug: formData.slug,
    formDataTitle: formData.title,
    isEditMode,
    productId,
    setGeneratedVariants,
  });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  // Check if selected category requires sizes
  const isClothingCategory = () => checkIsClothingCategory(formData.primaryCategoryId, categories);

  // Image handling using hook
  const {
    addImageUrl,
    removeImageUrl,
    updateImageUrl,
    setFeaturedImage,
    handleUploadImages,
    handleUploadVariantImage,
    handleUploadColorImages,
    addColorImages,
  } = useImageHandling({
    imageUrls: formData.imageUrls,
    featuredImageIndex: formData.featuredImageIndex,
    variants: formData.variants,
    generatedVariants,
    colorImageTarget,
    setImageUrls: (updater) => setFormData((prev) => ({ ...prev, imageUrls: updater(prev.imageUrls) })),
    setFeaturedImageIndex: (index) => setFormData((prev) => ({ ...prev, featuredImageIndex: index })),
    setMainProductImage: (image) => setFormData((prev) => ({ ...prev, mainProductImage: image })),
    setVariants: (updater) => setFormData((prev) => ({ ...prev, variants: updater(prev.variants) })),
    setGeneratedVariants,
    setImageUploadLoading,
    setImageUploadError,
    setColorImageTarget,
    t,
  });


  // Label management using hook
  const { addLabel, removeLabel, updateLabel } = useLabelManagement(
    formData.labels,
    (updater) => setFormData((prev) => ({ ...prev, labels: updater(prev.labels) }))
  );

  // Memoize color and size attributes to avoid unnecessary recalculations
  const colorAttribute = useMemo(() => {
    if (!attributes || attributes.length === 0) {
      return undefined;
    }
    const colorAttr = attributes.find((attr) => attr.key === 'color');
    if (!colorAttr) {
      console.log('⚠️ [ADMIN] Color attribute not found. Available attributes:', attributes.map(a => ({ key: a.key, name: a.name })));
    } else {
      console.log('✅ [ADMIN] Color attribute found:', { id: colorAttr.id, key: colorAttr.key, valuesCount: colorAttr.values?.length || 0 });
    }
    return colorAttr;
  }, [attributes]);

  const sizeAttribute = useMemo(() => {
    if (!attributes || attributes.length === 0) {
      return undefined;
    }
    const sizeAttr = attributes.find((attr) => attr.key === 'size');
    if (!sizeAttr) {
      console.log('⚠️ [ADMIN] Size attribute not found. Available attributes:', attributes.map(a => ({ key: a.key, name: a.name })));
    } else {
      console.log('✅ [ADMIN] Size attribute found:', { id: sizeAttr.id, key: sizeAttr.key, valuesCount: sizeAttr.values?.length || 0 });
    }
    return sizeAttr;
  }, [attributes]);

  // Keep getColorAttribute and getSizeAttribute for backward compatibility
  const getColorAttribute = () => colorAttribute;
  const getSizeAttribute = () => sizeAttribute;

  // Use attribute handlers hook
  const attributeHandlers = useProductAttributeHandlers({
    attributes,
    setAttributes,
    getColorAttribute,
    getSizeAttribute,
  });

  // Use form handlers hook
  const { handleSubmit } = useProductFormHandlers({
    formData,
    setFormData,
    setLoading,
    setBrands,
    setCategories,
    productType,
    simpleProductData,
    selectedAttributesForVariants,
    generatedVariants,
    attributes,
    defaultCurrency,
    useNewBrand,
    newBrandName,
    useNewCategory,
    newCategoryName,
    isEditMode,
    productId,
    getColorAttribute,
    getSizeAttribute,
    isClothingCategory,
  });

  if (isLoading || loadingProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">{loadingProduct ? t('admin.products.add.loadingProduct') : t('admin.products.add.loading')}</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !isAdmin) {
    return null;
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div>
          <PageHeader isEditMode={isEditMode} />

          <Card className="p-6 pb-24 sm:pb-24">
          <form onSubmit={handleSubmit} className="space-y-14">
            {/* Basic Information */}
            <BasicInformation
              productType={productType}
              setProductType={setProductType}
              title={formData.title}
              slug={formData.slug}
              descriptionHtml={formData.descriptionHtml}
              onTitleChange={handleTitleChange}
              onSlugChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
              onDescriptionChange={(e) => setFormData((prev) => ({ ...prev, descriptionHtml: e.target.value }))}
            />

            {/* Product Images */}
            <ProductImages
              imageUrls={formData.imageUrls}
              featuredImageIndex={formData.featuredImageIndex}
              imageUploadLoading={imageUploadLoading}
              imageUploadError={imageUploadError}
              fileInputRef={fileInputRef}
              onUploadImages={handleUploadImages}
              onRemoveImage={removeImageUrl}
              onSetFeaturedImage={setFeaturedImage}
            />

            {/* Categories & Brands */}
            <CategoriesBrands
              categories={categories}
              brands={brands}
              categoryIds={formData.categoryIds}
              brandIds={formData.brandIds}
              categoriesExpanded={categoriesExpanded}
              brandsExpanded={brandsExpanded}
              useNewCategory={useNewCategory}
              useNewBrand={useNewBrand}
              newCategoryName={newCategoryName}
              newBrandName={newBrandName}
              onCategoriesExpandedChange={setCategoriesExpanded}
              onBrandsExpandedChange={setBrandsExpanded}
              onUseNewCategoryChange={setUseNewCategory}
              onUseNewBrandChange={setUseNewBrand}
              onNewCategoryNameChange={setNewCategoryName}
              onNewBrandNameChange={setNewBrandName}
              onCategoryIdsChange={(ids) => setFormData((prev) => ({ ...prev, categoryIds: ids }))}
              onBrandIdsChange={(ids) => setFormData((prev) => ({ ...prev, brandIds: ids }))}
              onPrimaryCategoryIdChange={(id) => setFormData((prev) => ({ ...prev, primaryCategoryId: id }))}
              isClothingCategory={isClothingCategory}
              onVariantsUpdate={(updater) => setFormData((prev) => ({ ...prev, variants: updater(prev.variants) }))}
            />

            {/* Simple Product Fields - Only shown when productType === 'simple' */}
            {productType === 'simple' && (
              <SimpleProductFields
                price={simpleProductData.price}
                compareAtPrice={simpleProductData.compareAtPrice}
                sku={simpleProductData.sku}
                quantity={simpleProductData.quantity}
                defaultCurrency={defaultCurrency}
                onPriceChange={(value) => setSimpleProductData((prev) => ({ ...prev, price: value }))}
                onCompareAtPriceChange={(value) => setSimpleProductData((prev) => ({ ...prev, compareAtPrice: value }))}
                onSkuChange={(value) => setSimpleProductData((prev) => ({ ...prev, sku: value }))}
                onQuantityChange={(value) => setSimpleProductData((prev) => ({ ...prev, quantity: value }))}
              />
            )}

            {/* Select Attributes for Variants - Only shown when productType === 'variable' */}
            {productType === 'variable' && (
              <AttributesSelection
                attributes={attributes}
                selectedAttributesForVariants={selectedAttributesForVariants}
                selectedAttributeValueIds={selectedAttributeValueIds}
                attributesDropdownOpen={attributesDropdownOpen}
                attributesDropdownRef={attributesDropdownRef}
                onAttributesDropdownToggle={() => setAttributesDropdownOpen(!attributesDropdownOpen)}
                onAttributeToggle={(attributeId, checked) => {
                  const newSet = new Set(selectedAttributesForVariants);
                  if (checked) {
                    newSet.add(attributeId);
                  } else {
                    newSet.delete(attributeId);
                    const newValueIds = { ...selectedAttributeValueIds };
                    delete newValueIds[attributeId];
                    setSelectedAttributeValueIds(newValueIds);
                  }
                  setSelectedAttributesForVariants(newSet);
                }}
                onAttributeRemove={(attributeId) => {
                  const newSet = new Set(selectedAttributesForVariants);
                  newSet.delete(attributeId);
                  const newValueIds = { ...selectedAttributeValueIds };
                  delete newValueIds[attributeId];
                  setSelectedAttributeValueIds(newValueIds);
                  setSelectedAttributesForVariants(newSet);
                }}
              />
            )}

            {/* New Multi-Attribute Variant Builder - Only shown when productType === 'variable' */}
            {productType === 'variable' &&
              ((isEditMode && (generatedVariants.length > 0 || hasVariantsToLoad)) ||
                selectedAttributesForVariants.size > 0) && (
                <VariantBuilder
                  generatedVariants={generatedVariants}
                  attributes={attributes}
                  selectedAttributesForVariants={selectedAttributesForVariants}
                  isEditMode={isEditMode}
                  hasVariantsToLoad={hasVariantsToLoad}
                  defaultCurrency={defaultCurrency}
                  imageUploadLoading={imageUploadLoading}
                  slug={formData.slug}
                  title={formData.title}
                  variantImageInputRefs={variantImageInputRefs}
                  onVariantUpdate={setGeneratedVariants}
                  onVariantDelete={(variantId) => {
                    setGeneratedVariants((prev) => prev.filter((v) => v.id !== variantId));
                  }}
                  onVariantAdd={() => {
                    const newVariant: GeneratedVariant = {
                      id: `variant-${Date.now()}-${Math.random()}`,
                      selectedValueIds: [],
                      price: '0.00',
                      compareAtPrice: '0.00',
                      stock: '0',
                      sku: 'PROD',
                      image: null,
                    };
                    setGeneratedVariants((prev) => {
                      const updated = [...prev, newVariant];
                      console.log('✅ [VARIANT BUILDER] New manual variant added:', {
                        newVariantId: newVariant.id,
                        totalVariants: updated.length,
                        manualVariants: updated.filter((v) => v.id !== 'variant-all').length,
                        autoVariants: updated.filter((v) => v.id === 'variant-all').length,
                      });
                      return updated;
                    });
                  }}
                  onApplyToAll={applyToAllVariants}
                  onVariantImageUpload={handleUploadVariantImage}
                  onOpenValueModal={setOpenValueModal}
                  generateSlug={generateSlug}
                />
              )}

            {/* Product Labels */}
            <ProductLabels
              labels={formData.labels}
              onAddLabel={addLabel}
              onRemoveLabel={removeLabel}
              onUpdateLabel={updateLabel}
            />

            {/* Publishing */}
            <Publishing
              featured={formData.featured}
              onFeaturedChange={(featured) => setFormData((prev) => ({ ...prev, featured }))}
            />

            {/* Actions - Sticky */}
            <FormActions loading={loading} isEditMode={isEditMode} />
          </form>
        </Card>
        </div>
      </div>

      {/* Value Selection Modal */}
      {openValueModal && (
        <ValueSelectionModal
          openValueModal={openValueModal}
          variant={generatedVariants.find((v) => v.id === openValueModal.variantId)}
          attribute={attributes.find((a) => a.id === openValueModal.attributeId)}
          selectedAttributeValueIds={selectedAttributeValueIds}
          onClose={() => setOpenValueModal(null)}
          onVariantUpdate={setGeneratedVariants}
          onAttributeValueIdsUpdate={setSelectedAttributeValueIds}
        />
      )}
    </div>
  );
}

export default function AddProductPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <AddProductPageContent />
    </Suspense>
  );
}
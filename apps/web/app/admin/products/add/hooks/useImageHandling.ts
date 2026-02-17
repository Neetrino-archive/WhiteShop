'use client';

import type { ChangeEvent } from 'react';
import { processImageFile } from '../../../../../lib/utils/image-utils';
import type { Variant, ColorData } from '../types';
import type { GeneratedVariant } from '../types';

interface UseImageHandlingProps {
  imageUrls: string[];
  featuredImageIndex: number;
  variants: Variant[];
  generatedVariants: GeneratedVariant[];
  colorImageTarget: { variantId: string; colorValue: string } | null;
  setImageUrls: (updater: (prev: string[]) => string[]) => void;
  setFeaturedImageIndex: (index: number) => void;
  setMainProductImage: (image: string) => void;
  setVariants: (updater: (prev: Variant[]) => Variant[]) => void;
  setGeneratedVariants: (updater: (prev: GeneratedVariant[]) => GeneratedVariant[]) => void;
  setImageUploadLoading: (loading: boolean) => void;
  setImageUploadError: (error: string | null) => void;
  setColorImageTarget: (target: { variantId: string; colorValue: string } | null) => void;
  t: (key: string) => string;
}

interface UseImageHandlingReturn {
  addImageUrl: () => void;
  removeImageUrl: (index: number) => void;
  updateImageUrl: (index: number, url: string) => void;
  setFeaturedImage: (index: number) => void;
  handleUploadImages: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleUploadVariantImage: (variantId: string, event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleUploadColorImages: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  addColorImages: (variantId: string, colorValue: string, images: string[]) => void;
}

export function useImageHandling({
  imageUrls,
  featuredImageIndex,
  variants,
  generatedVariants,
  colorImageTarget,
  setImageUrls,
  setFeaturedImageIndex,
  setMainProductImage,
  setVariants,
  setGeneratedVariants,
  setImageUploadLoading,
  setImageUploadError,
  setColorImageTarget,
  t,
}: UseImageHandlingProps): UseImageHandlingReturn {
  const addImageUrl = () => {
    setImageUrls((prev) => [...prev, '']);
  };

  const removeImageUrl = (index: number) => {
    setImageUrls((prev) => {
      const newUrls = prev.filter((_, i) => i !== index);
      let newFeaturedIndex = featuredImageIndex;
      if (index === featuredImageIndex) {
        newFeaturedIndex = 0;
      } else if (index < featuredImageIndex) {
        newFeaturedIndex = Math.max(0, featuredImageIndex - 1);
      }
      const finalFeaturedIndex = newUrls.length === 0 ? 0 : Math.min(newFeaturedIndex, newUrls.length - 1);
      const mainImage = newUrls.length > 0 && newUrls[finalFeaturedIndex] ? newUrls[finalFeaturedIndex] : '';
      setFeaturedImageIndex(finalFeaturedIndex);
      setMainProductImage(mainImage);
      return newUrls;
    });
  };

  const updateImageUrl = (index: number, url: string) => {
    setImageUrls((prev) => {
      const newUrls = [...prev];
      newUrls[index] = url;
      return newUrls;
    });
  };

  const setFeaturedImage = (index: number) => {
    if (index < 0 || index >= imageUrls.length) {
      return;
    }
    const mainImage = imageUrls[index] || '';
    setFeaturedImageIndex(index);
    setMainProductImage(mainImage);
  };

  const addColorImages = (variantId: string, colorValue: string, images: string[]) => {
    console.log('🖼️ [ADMIN] Adding images to color:', {
      variantId,
      colorValue,
      imagesCount: images.length,
    });

    setVariants((prev) =>
      prev.map((v) => {
        if (v.id === variantId) {
          const updatedColors = v.colors.map((c) => {
            if (c.colorValue === colorValue) {
              const uniqueNewImages = images.filter((newImg) => !c.images.includes(newImg));
              const newImages = [...c.images, ...uniqueNewImages];
              return { ...c, images: newImages };
            }
            return c;
          });
          return { ...v, colors: updatedColors };
        }
        return v;
      })
    );
  };

  const handleUploadImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) {
      return;
    }

    console.log('📸 [UPLOAD] Starting upload of', files.length, 'image(s)');
    setImageUploadLoading(true);
    setImageUploadError(null);
    try {
      const uploadedImages: string[] = [];
      const errors: string[] = [];

      const filePromises = files.map(async (file, index) => {
        try {
          if (!file.type.startsWith('image/')) {
            const errorMsg = `"${file.name}" is not an image file`;
            console.warn(`⚠️ [UPLOAD] Skipping non-image file ${index + 1}/${files.length}:`, file.name);
            return { success: false, error: errorMsg, index };
          }

          console.log(`📸 [UPLOAD] Processing file ${index + 1}/${files.length}:`, file.name, `(${Math.round(file.size / 1024)}KB)`);

          const base64 = await processImageFile(file, {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: 'image/jpeg',
            initialQuality: 0.8,
          });

          if (base64 && base64.trim()) {
            console.log(`✅ [UPLOAD] Successfully processed file ${index + 1}/${files.length}:`, file.name);
            return { success: true, base64, index };
          } else {
            const errorMsg = `Failed to convert "${file.name}" to base64`;
            console.error(`❌ [UPLOAD] Empty base64 result for file ${index + 1}/${files.length}:`, file.name);
            return { success: false, error: errorMsg, index };
          }
        } catch (error: any) {
          const errorMsg = `Error processing "${file.name}": ${error?.message || 'Unknown error'}`;
          console.error(`❌ [UPLOAD] Error processing file ${index + 1}/${files.length}:`, file.name, error);
          return { success: false, error: errorMsg, index };
        }
      });

      const results = await Promise.allSettled(filePromises);

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          const fileResult = result.value;
          if (fileResult.success && fileResult.base64) {
            uploadedImages.push(fileResult.base64);
          } else if (!fileResult.success && fileResult.error) {
            errors.push(fileResult.error);
          }
        } else {
          const errorMsg = `Failed to process file: ${result.reason?.message || 'Unknown error'}`;
          errors.push(errorMsg);
          console.error(`❌ [UPLOAD] Promise rejected:`, result.reason);
        }
      });

      console.log('📸 [UPLOAD] Upload complete. Processed:', uploadedImages.length, 'of', files.length, 'files');
      if (errors.length > 0) {
        console.warn('⚠️ [UPLOAD] Errors during upload:', errors);
        setImageUploadError(errors.join('; '));
      }

      if (uploadedImages.length === 0) {
        setImageUploadError(t('admin.products.add.failedToProcessImages') || 'Failed to process images');
        return;
      }

      setImageUrls((prev) => {
        const newImageUrls = [...prev, ...uploadedImages];
        const newFeaturedIdx = prev.length === 0 ? 0 : featuredImageIndex;
        if (prev.length === 0 && newImageUrls.length > 0) {
          setFeaturedImageIndex(0);
          setMainProductImage(newImageUrls[0]);
        }
        return newImageUrls;
      });
    } catch (error: any) {
      console.error('❌ [UPLOAD] Fatal error during upload:', error);
      setImageUploadError(error?.message || t('admin.products.add.failedToProcessImages'));
    } finally {
      setImageUploadLoading(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleUploadVariantImage = async (variantId: string, event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      setImageUploadError(`"${file.name}" is not an image file`);
      if (event.target) {
        event.target.value = '';
      }
      return;
    }

    setImageUploadLoading(true);
    setImageUploadError(null);
    try {
      console.log('🖼️ [VARIANT IMAGE] Processing variant image:', {
        variantId,
        fileName: file.name,
        originalSize: `${Math.round(file.size / 1024)}KB`,
      });

      const base64 = await processImageFile(file, {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/jpeg',
        initialQuality: 0.8,
      });

      setGeneratedVariants((prev) => prev.map((v) => (v.id === variantId ? { ...v, image: base64 } : v)));
      console.log('✅ [VARIANT BUILDER] Variant image uploaded and processed for variant:', variantId);
    } catch (error: any) {
      console.error('❌ [VARIANT IMAGE] Error processing variant image:', error);
      setImageUploadError(error?.message || t('admin.products.add.failedToProcessImage'));
    } finally {
      setImageUploadLoading(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleUploadColorImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length || !colorImageTarget) {
      console.log('⚠️ [ADMIN] No files or no color target:', { filesLength: files.length, colorImageTarget });
      if (event.target) {
        event.target.value = '';
      }
      return;
    }

    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      if (event.target) {
        event.target.value = '';
      }
      return;
    }

    try {
      setImageUploadLoading(true);
      console.log('📤 [ADMIN] Starting upload for color:', colorImageTarget.colorValue, 'Files:', imageFiles.length);

      const uploadedImages = await Promise.all(
        imageFiles.map(async (file, index) => {
          console.log(`🖼️ [COLOR IMAGE] Processing image ${index + 1}/${imageFiles.length}:`, {
            fileName: file.name,
            originalSize: `${Math.round(file.size / 1024)}KB`,
          });

          const base64 = await processImageFile(file, {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: 'image/jpeg',
            initialQuality: 0.8,
          });

          console.log(`✅ [COLOR IMAGE] Image ${index + 1}/${imageFiles.length} processed, base64 length:`, base64.length);
          return base64;
        })
      );

      console.log('📥 [ADMIN] All images processed, adding to variant:', {
        variantId: colorImageTarget.variantId,
        colorValue: colorImageTarget.colorValue,
        imagesCount: uploadedImages.length,
      });

      addColorImages(colorImageTarget.variantId, colorImageTarget.colorValue, uploadedImages);
      console.log('✅ [ADMIN] Color images added to state:', uploadedImages.length);
    } catch (error: any) {
      console.error('❌ [ADMIN] Error uploading color images:', error);
      setImageUploadError(error?.message || t('admin.products.add.failedToProcessImages'));
    } finally {
      setImageUploadLoading(false);
      if (event.target) {
        event.target.value = '';
      }
      setColorImageTarget(null);
    }
  };

  return {
    addImageUrl,
    removeImageUrl,
    updateImageUrl,
    setFeaturedImage,
    handleUploadImages,
    handleUploadVariantImage,
    handleUploadColorImages,
    addColorImages,
  };
}



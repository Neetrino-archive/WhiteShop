interface ProcessImagesForSubmitProps {
  imageUrls: string[];
  featuredImageIndex: number;
  mainProductImage: string;
  variants: any[];
}

export function processImagesForSubmit({
  imageUrls,
  featuredImageIndex,
  mainProductImage,
  variants,
}: ProcessImagesForSubmitProps): {
  finalMedia: string[];
  mainImage: string | null;
  processedVariants: any[];
} {
  const isBase64Image = (url: string): boolean => {
    return url.startsWith('data:image/');
  };

  const isUrl = (url: string): boolean => {
    return url.startsWith('http://') || url.startsWith('https://');
  };

  const getBase64Size = (base64: string): number => {
    const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;
    return Math.ceil(base64Data.length * 0.75);
  };

  const processImages = (images: string[]): { processed: string[]; skipped: number } => {
    const MAX_BASE64_SIZE = 5 * 1024 * 1024; // 5MB per image max
    let skippedCount = 0;
    
    const processed = images.filter(img => {
      if (isUrl(img)) {
        return true;
      }
      
      if (isBase64Image(img)) {
        const size = getBase64Size(img);
        if (size > MAX_BASE64_SIZE) {
          console.warn(`⚠️ [ADMIN] Image too large (${Math.round(size / 1024)}KB), skipping to avoid 413 error.`);
          skippedCount++;
          return false;
        }
        return true;
      }
      
      return true;
    });
    
    return { processed, skipped: skippedCount };
  };

  const processMainImagesWithPositions = (images: string[]): { mapping: (string | null)[]; skipped: number } => {
    const MAX_BASE64_SIZE = 5 * 1024 * 1024;
    const mapping: (string | null)[] = [];
    let skippedCount = 0;
    
    images.forEach((img) => {
      if (isUrl(img)) {
        mapping.push(img);
        return;
      }
      
      if (isBase64Image(img)) {
        const size = getBase64Size(img);
        if (size > MAX_BASE64_SIZE) {
          console.warn(`⚠️ [ADMIN] Main image too large (${Math.round(size / 1024)}KB), skipping to avoid 413 error.`);
          skippedCount++;
          mapping.push(null);
          return;
        }
        mapping.push(img);
        return;
      }
      
      mapping.push(img);
    });
    
    return { mapping, skipped: skippedCount };
  };

  const mainImages: string[] = [];
  if (imageUrls.length > 0) {
    mainImages.push(...imageUrls.filter(Boolean));
  } else if (mainProductImage) {
    mainImages.push(mainProductImage);
  }

  const mainImagesProcessed = mainImages.length > 0 ? processMainImagesWithPositions(mainImages) : { mapping: [], skipped: 0 };
  const mainImageMapping = mainImagesProcessed.mapping;

  const variantImages: string[] = [];
  variants.forEach(variant => {
    if (variant.imageUrl) {
      const imageUrls = variant.imageUrl.split(',').map((url: string) => url.trim()).filter(Boolean);
      variantImages.push(...imageUrls);
    }
  });

  const variantImagesProcessed = variantImages.length > 0 ? processImages(variantImages) : { processed: [], skipped: 0 };
  const processedVariantImages = variantImagesProcessed.processed;
  const skippedImagesCount = mainImagesProcessed.skipped + variantImagesProcessed.skipped;
  
  if (skippedImagesCount > 0) {
    console.warn(`⚠️ [ADMIN] ${skippedImagesCount} large image(s) were skipped to avoid 413 error.`);
  }

  const processedVariants = [...variants];
  let variantImageIndex = 0;
  processedVariants.forEach(variant => {
    if (variant.imageUrl) {
      const imageUrls = variant.imageUrl.split(',').map((url: string) => url.trim()).filter(Boolean);
      const processedUrls = processedVariantImages.slice(variantImageIndex, variantImageIndex + imageUrls.length);
      variant.imageUrl = processedUrls.join(',');
      variantImageIndex += imageUrls.length;
    }
  });

  const finalMedia: string[] = [];
  
  if (imageUrls.length > 0) {
    const processedImageUrls: string[] = [];
    
    imageUrls.forEach((originalUrl, index) => {
      if (!originalUrl || !originalUrl.trim()) {
        return;
      }
      
      const mainImagesIndex = mainImages.indexOf(originalUrl);
      if (mainImagesIndex >= 0 && mainImagesIndex < mainImageMapping.length) {
        const processedImg = mainImageMapping[mainImagesIndex];
        if (processedImg) {
          processedImageUrls[index] = processedImg;
        }
      }
    });
    
    if (processedImageUrls[featuredImageIndex]) {
      finalMedia.push(processedImageUrls[featuredImageIndex]);
    }
    processedImageUrls.forEach((url, index) => {
      if (index !== featuredImageIndex && url) {
        finalMedia.push(url);
      }
    });
  } else if (mainProductImage) {
    const mainImgProcessed = mainImageMapping[0];
    if (mainImgProcessed) {
      finalMedia.push(mainImgProcessed);
    }
  }
  
  const mainImage = imageUrls.length > 0 && mainImageMapping.length > featuredImageIndex
    ? mainImageMapping[featuredImageIndex]
    : (mainImageMapping.length > 0 ? mainImageMapping[0] : mainProductImage);

  return { finalMedia, mainImage, processedVariants };
}

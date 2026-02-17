import { apiClient } from '@/lib/api-client';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { Attribute } from '../types';

interface CreateAndSubmitPayloadProps {
  formData: {
    title: string;
    slug: string;
    descriptionHtml: string;
    categoryIds: string[];
    published: boolean;
    featured: boolean;
    imageUrls: string[];
    featuredImageIndex: number;
    mainProductImage: string;
    labels: any[];
  };
  finalBrandIds: string[];
  finalPrimaryCategoryId: string;
  variants: any[];
  attributeIds: string[];
  finalMedia: string[];
  mainImage: string | null;
  isEditMode: boolean;
  productId: string | null;
  creationMessages: string[];
  setLoading: (loading: boolean) => void;
  router: AppRouterInstance;
}

export async function createAndSubmitPayload({
  formData,
  finalBrandIds,
  finalPrimaryCategoryId,
  variants,
  attributeIds,
  finalMedia,
  mainImage,
  isEditMode,
  productId,
  creationMessages,
  setLoading,
  router,
}: CreateAndSubmitPayloadProps): Promise<void> {
  const payload: any = {
      title: formData.title,
      slug: formData.slug,
      descriptionHtml: formData.descriptionHtml || undefined,
      brandId: finalBrandIds.length > 0 ? finalBrandIds[0] : undefined,
      primaryCategoryId: finalPrimaryCategoryId || undefined,
      categoryIds: formData.categoryIds.length > 0 ? formData.categoryIds : undefined,
      published: isEditMode ? formData.published : true,
      featured: formData.featured,
      locale: 'en',
      variants: variants,
      attributeIds: attributeIds.length > 0 ? attributeIds : undefined,
    };
    
    if (finalMedia.length > 0) {
      payload.media = finalMedia;
    }
    
    if (mainImage) {
      payload.mainProductImage = mainImage;
    }

    payload.labels = (formData.labels || [])
      .filter((label) => label.value && label.value.trim() !== '')
      .map((label) => ({
        type: label.type,
        value: label.value.trim(),
        position: label.position,
        color: label.color || null,
      }));

    console.log('📤 [ADMIN] Sending payload:', JSON.stringify(payload, null, 2));
    
    try {
      if (isEditMode && productId) {
        const product = await apiClient.put(`/api/v1/admin/products/${productId}`, payload);
        console.log('✅ [ADMIN] Product updated:', product);
        const baseMessage = 'Ապրանքը հաջողությամբ թարմացվեց!';
        const extra = creationMessages.length ? `\n\n${creationMessages.join('\n')}` : '';
        alert(`${baseMessage}${extra}`);
      } else {
        const product = await apiClient.post('/api/v1/admin/products', payload);
        console.log('✅ [ADMIN] Product created:', product);
        const baseMessage = 'Ապրանքը հաջողությամբ ստեղծվեց!';
        const extra = creationMessages.length ? `\n\n${creationMessages.join('\n')}` : '';
        alert(`${baseMessage}${extra}`);
      }
      
      router.push('/admin/products');
    } catch (err: any) {
      console.error('❌ [ADMIN] Error saving product:', err);
      
      let errorMessage = isEditMode ? 'Չհաջողվեց թարմացնել ապրանքը' : 'Չհաջողվեց ստեղծել ապրանքը';
      
      if (err?.data?.detail) {
        errorMessage = err.data.detail;
      } else if (err?.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      } else if (err?.message) {
        if (err.message.includes('<!DOCTYPE') || err.message.includes('<html')) {
          const mongoErrorMatch = err.message.match(/MongoServerError[^<]+/);
          if (mongoErrorMatch) {
            errorMessage = `Տվյալների բազայի սխալ: ${mongoErrorMatch[0]}`;
          } else {
            errorMessage = 'Տվյալների բազայի սխալ: SKU-ն արդեն օգտագործված է կամ այլ սխալ:';
          }
        } else {
          errorMessage = err.message;
        }
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
}


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CatalogResponse, Order, Measurement, Style } from '../backend';

export function useCatalog() {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<CatalogResponse>({
    queryKey: ['catalog'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      const catalog = await actor.getCatalog();
      
      // Filter out "Saree Blouse" and "African Kaftan" from styles at the hook level
      const filteredStyles = catalog.styles.filter(
        (style) => style.name !== 'Saree Blouse' && style.name !== 'African Kaftan'
      );
      
      // Map static asset images to specific styles
      const stylesWithImages: Style[] = filteredStyles.map((style) => {
        // Map Pathani Kurta to the uploaded photo
        if (style.name === 'Pathani Kurta') {
          return {
            ...style,
            image: '/assets/generated/catalog-pathani-kurta.dim_1200x900.png',
          };
        }
        // Keep other styles unchanged
        return style;
      });
      
      return {
        categories: catalog.categories,
        styles: stylesWithImages,
      };
    },
    enabled: !!actor && !isActorFetching,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSubmitOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: {
      customerName: string;
      contactInfo: string;
      categoryId: bigint;
      styleId: bigint;
      measurement: Measurement;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitOrder(
        orderData.customerName,
        orderData.contactInfo,
        orderData.categoryId,
        orderData.styleId,
        orderData.measurement
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (inquiryData: {
      name: string;
      contact: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitInquiry(
        inquiryData.name,
        inquiryData.contact,
        inquiryData.message
      );
    },
  });
}

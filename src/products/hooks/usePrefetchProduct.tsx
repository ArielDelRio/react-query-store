import { productActions } from "..";
import { usePrefetch } from "./usePrefetch";

export const usePrefetchProduct = () => {
  const { prefetch } = usePrefetch();

  const prefetchProduct = (productId: number) => {
    prefetch({
      queryKey: ["product", productId],
      queryFn: () => productActions.getProduct({ productId }),
      staleTime: 1000 * 60 * 60,
    });
  };

  return {
    prefetchProduct,
  };
};

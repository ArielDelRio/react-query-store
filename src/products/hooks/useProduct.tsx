import { useQuery } from "@tanstack/react-query";
import { productActions } from "..";

interface Options {
  productId: number;
}

export const useProduct = ({ productId }: Options) => {
  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productActions.getProduct({ productId }),
    staleTime: 1000 * 60 * 60,
  });

  return { productQuery };
};

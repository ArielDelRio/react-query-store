import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const productMutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate: async (product: Product) => {
      // Optimistic update
      // Create an optimistic product
      const optimisticProduct: Product = {
        ...product,
        id: Math.random(),
      };

      // add optimistic product to the cache
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (oldData) => {
          if (!oldData) return [optimisticProduct];
          return [...oldData, optimisticProduct];
        }
      );

      return { optimisticId: optimisticProduct.id };
    },

    onSuccess: (product, _variables, context) => {
      alert("Producto creado correctamente");

      // Invalidate the products query to refetch the data
      // queryClient.invalidateQueries({
      //   queryKey: ["products", { filterKey: product.category }],
      // });

      // Update the cache to avoid fetching the data again
      //  queryClient.setQueryData<Product[]>(
      //    ["products", { filterKey: product.category }],
      //     (oldData) => {
      //      if (!oldData) return [product];
      //      return [...oldData, product];
      //    }
      //  );

      // on success optimistic update
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (oldData) => {
          if (!oldData) return [product];
          return oldData.map((p) =>
            p.id === context?.optimisticId ? product : p
          );
        }
      );
    },

    onError: (_error, product, context) => {
      // Revert the optimistic update
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (oldData) => {
          if (!oldData) return oldData;
          return oldData.filter((p) => p.id !== context?.optimisticId);
        }
      );

      alert("Hubo un error al crear el producto");
    },
  });

  return {
    productMutation,
  };
};

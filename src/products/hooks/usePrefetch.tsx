import { QueryFunction, QueryKey, useQueryClient } from "@tanstack/react-query";

export const usePrefetch = () => {
  const queryClient = useQueryClient();

  const prefetch = ({
    queryKey,
    queryFn,
    staleTime,
  }: {
    queryKey: QueryKey;
    queryFn: QueryFunction;
    staleTime: number;
  }) => {
    queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: staleTime,
    });
  };

  return {
    prefetch,
  };
};

import { ProductList, useProducts } from "..";

export const CompleteListPage = () => {
  const { queryProducts } = useProducts({});

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Todos los productos</h1>

      {queryProducts.isLoading && <p>Cargando...</p>}

      <ProductList products={queryProducts?.data || []} />
    </div>
  );
};

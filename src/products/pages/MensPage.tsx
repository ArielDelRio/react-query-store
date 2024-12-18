import { ProductList, useProducts } from "..";

export const MensPage = () => {
  const { queryProducts } = useProducts({ filterKey: "men's clothing" });

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para hombres</h1>

      {queryProducts.isLoading && <p>Cargando...</p>}

      <ProductList products={queryProducts?.data || []} />
    </div>
  );
};

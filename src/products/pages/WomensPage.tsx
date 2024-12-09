import { ProductList, useProducts } from "..";

export const WomensPage = () => {
  const { queryProducts } = useProducts({ filterKey: "women's clothing" });

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para mujeres</h1>

      {queryProducts.isLoading && <p>Cargando...</p>}

      <ProductList products={queryProducts?.data || []} />
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Product, type ProductLike, productApi } from "..";

interface GetProductsOptions {
  filterKey?: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProducts = async ({
  filterKey,
}: GetProductsOptions): Promise<Product[]> => {
  const filterUrl = filterKey ? `?category=${filterKey}` : "";

  await sleep(1500);

  const { data } = await productApi.get<Product[]>(`/products${filterUrl}`);
  return data;
};

export const getProduct = async ({
  productId,
}: {
  productId: number;
}): Promise<Product> => {
  await sleep(1500);

  const { data } = await productApi.get<Product>(`/products/${productId}`);
  return data;
};

export const createProduct = async (product: ProductLike): Promise<Product> => {
  await sleep(5000);

  const { data } = await productApi.post<Product>("/products", product);
  return data;
};

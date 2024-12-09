import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Product, useProductMutation } from "..";

interface FormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const NewProduct = () => {
  const { productMutation } = useProductMutation();

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      category: "men's clothing",
      image: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log({ data });
    productMutation.mutate(data as Product);
  };

  const newImage = watch("image");

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around items-center">
          <div className="flex-col w-[500px]">
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className="mt-2"
                  type="text"
                  label="Titulo del producto"
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className="mt-2"
                  type="number"
                  label="Precio del producto"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value?.toString()}
                />
              )}
            />

            <Controller
              control={control}
              name="image"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className="mt-2"
                  type="url"
                  label="URL de la imagen del producto"
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  className="mt-2"
                  label="Descripcion del producto"
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  className="rounded-md p-3 mt-2 bg-gray-800 w-full"
                  {...field}
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <br />
            <Button
              className="mt-2"
              color="primary"
              type="submit"
              isDisabled={productMutation.isPending}
            >
              {productMutation.isPending ? "Creando..." : "Crear"}
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center"
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            <Image
              src={
                newImage ||
                "https://princetoncryo.com/media/catalog/category/default_product.jpg"
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
};

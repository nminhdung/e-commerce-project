/* eslint-disable react/style-prop-object */
import React from "react";
import { useForm } from "react-hook-form";
import { Button, InputForm, SelectForm } from "../../components";
import { useSelector } from "react-redux";

const CreateProduct = () => {
  const { categories } = useSelector((state) => state.app);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const handleCreateData = (data) => {
    if (data.category) {
      data.category = categories?.find((el) => el._id === data.category)?.title;
    }
    console.log(data);
  };
  return (
    <div className="w-full">
      <h1 className="border-b p-4 font-semibold text-3xl">
        Create New Product
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateData)}>
          <InputForm
            name="title"
            label="Name Product"
            register={register}
            errors={errors}
            valide={{ required: "Please fill this field" }}
            placeholder="Name of new Product"
          />
          <div className="w-full flex gap-2">
            <InputForm
              name="price"
              label="Price Product"
              register={register}
              errors={errors}
              valide={{ required: "Please fill this field" }}
              placeholder="Price of new Product"
              type="number"
              style="flex-auto"
            />
            <InputForm
              name="quantity"
              label="Quantity Product"
              register={register}
              errors={errors}
              valide={{ required: "Please fill this field" }}
              placeholder="Quantity of new Product"
              type="number"
              style="flex-auto"
            />
          </div>
          <div className="w-full flex gap-2">
            <SelectForm
              label="Category"
              name="category"
              validate={{}}
              options={categories?.map((cate) => ({
                code: cate._id,
                value: cate.title,
              }))}
              register={register}
              errors={errors}
              style="flex-1"
            />
            <SelectForm
              label="Brand"
              name="brand"
              validate={{}}
              options={categories
                .find((cate) => cate._id === watch("category"))
                ?.brand?.map((item) => ({ code: item, value: item }))}
              register={register}
              errors={errors}
              style="flex-1"
            />
          </div>
          <Button type="submit">Create</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;

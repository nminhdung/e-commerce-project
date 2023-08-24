/* eslint-disable react/style-prop-object */
import React, { useRef, useState } from "react";
import { InputForm, SelectForm, Button, Loading } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "../../ckeditor/build/ckeditor";
import { fileToBase64 } from "../../utils/helpers";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiUpdateProduct } from "../../api";
import { closeModal, showModal } from "../../store/app/appSlice";

const EditProduct = ({ editProduct, setEditProduct, render }) => {
  const { categories } = useSelector((state) => state.app);
  const [previewImg, setPreviewImg] = useState({
    thumb: null,
    images: [],
  });
  const [description, setDescription] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
    watch,
    control,
  } = useForm();
  const dispatch = useDispatch();
  const onSubmitEdit = async (data) => {
    const formData = new FormData();
    console.log({ ...data });

    if (data.thumb) {
      data.thumb = data.thumb?.length === 0 ? previewImg.thumb : data.thumb[0];
    }

    for (let i of Object.entries(data)) {
      formData.append(i[0], i[1]);
    }
    console.log(data.images);
    if (data.images)
      data.images =
        data.images?.length === 0
          ? previewImg.images
          : data.images
    console.log(data.images);
    for (let image of data.images) {
      formData.append("images", image);
    }
   

    dispatch(showModal({ modalChildren: <Loading /> }));
    const res = await apiUpdateProduct(formData, editProduct._id);
    dispatch(closeModal({ modalChildren: null }));
    if (res.success) {
      toast.success(res.mes);
      render();
      setEditProduct(null);
    } else {
      toast.error(res.mess);
    }
  };

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await fileToBase64(file);
    setPreviewImg((prev) => ({ ...prev, thumb: base64Thumb }));
  };
  const handlePreviewImg = async (files) => {
    const imagesPreviews = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpg") {
        // console.log(file);
        toast.warning("Please choose file has type png or jpg");
        return;
      }
      const base64Thumb = await fileToBase64(file);
      imagesPreviews.push(base64Thumb);
    }

    setPreviewImg((prev) => ({ ...prev, images: imagesPreviews }));
  };
  useEffect(() => {
    reset({
      title: editProduct?.title,
      price: editProduct?.price,
      quantity: editProduct?.quantity,
      color: editProduct?.color,
      category: editProduct?.category,
      brand: editProduct?.brand?.toLowerCase(),
    });
    if (typeof editProduct?.description === "object") {
      setDescription(editProduct?.description.join(", "));
    } else {
      setDescription(editProduct?.description);
    }
    setPreviewImg({
      thumb: editProduct?.thumb || "",
      images: editProduct?.images.filter(item=>item!=="[object FileList]") || [],
    });
    setValue("description", description);
  }, [editProduct]);

  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0) {
      handlePreviewThumb(watch("thumb")[0]);
    }
  }, [watch("thumb")]);
  useEffect(() => {
    // console.log(watch("images"));
    //kiem tra watch(images) co phai thuoc dang filelist ko
    if (watch("images") instanceof FileList && watch("images").length > 0) {
      handlePreviewImg(watch("images"));
    }
  }, [watch("images")]);
  console.log(previewImg.images)
  return (
    <form onSubmit={handleSubmit(onSubmitEdit)}>
      <InputForm
        name="title"
        label="Name Product"
        register={register}
        errors={errors}
        validate={{ required: "Please fill this field" }}
        placeholder="Name of new Product"
      />
      <div className="w-full flex gap-2">
        <InputForm
          name="price"
          label="Price Product"
          register={register}
          errors={errors}
          validate={{ required: "Please fill this field" }}
          placeholder="Price of new Product"
          type="number"
          style="flex-auto"
        />
        <InputForm
          name="color"
          label="Color Product"
          register={register}
          errors={errors}
          validate={{}}
          placeholder="Color of new Product"
          type="text"
          style="flex-auto"
        />
        <InputForm
          name="quantity"
          label="Quantity Product"
          register={register}
          errors={errors}
          validate={{ required: "Please fill this field" }}
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
            code: cate.title,
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
            .find((cate) => cate.title === watch("category"))
            ?.brand?.map((item) => ({ code: item.toLowerCase(), value: item }))}
          register={register}
          errors={errors}
          style="flex-1"
        />
      </div>
      <div className="w-full flex flex-col gap-2 mb-4">
        <label htmlFor="description">Description</label>

        <div className="text-black ">
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                    field.onChange(data); // Update the React Hook Form field
                  }}
                />
                {errors.description && (
                  <p className="text-main">{errors.description.message}</p>
                )}
              </>
            )}
            rules={{ required: "Please fill this field." }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="thumb" className="font-semibold">
          Upload thumb
        </label>
        <input type="file" name="thumb" {...register("thumb")} />
        {errors["thumb"] && (
          <small className="text-xs text-main">
            {errors["thumb"]?.message}
          </small>
        )}
      </div>
      {previewImg.thumb && (
        <div className="my-4">
          <img
            src={previewImg.thumb}
            alt="thumb"
            className="w-[200px] object-contain"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="images" className="font-semibold">
          Upload images of product
        </label>
        <input type="file" name="images" {...register("images", {})} multiple />
        {previewImg.images.length > 0 && (
          <div className="my-4 flex items-center gap-1 w-full">
            {previewImg.images?.map((image, index) => {
              return (
                <div className="w-fit relative" key={index}>
                  <img
                    src={image}
                    alt="images"
                    className="w-[200px] h-[200px] object-cover "
                  />
                  {/* {hoverImg === image.name && (
                        <div
                          className="absolute inset-0 bg-overlay flex items-center justify-center cursor-pointer"
                          onClick={() => handleRemoveImg(image.name)}
                        >
                          <BsFillTrash3Fill size={24} color="white" />
                        </div>
                      )} */}
                </div>
              );
            })}
          </div>
        )}
        {errors["images"] && (
          <small className="text-xs text-main">
            {errors["images"]?.message}
          </small>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-4 py-2 bg-main rounded-md"
          onClick={() => {
            setEditProduct(null);
          }}
        >
          Back
        </button>
        <button type="submit" className="px-4 py-2 bg-green-500 rounded-md">
          Update
        </button>
      </div>
    
    </form>
  );
};

export default EditProduct;

/* eslint-disable react/style-prop-object */
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, InputForm, Loading, SelectForm } from "../../components";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiCreateProduct } from "../../api";
import ClassicEditor from "../../ckeditor/build/ckeditor";
import { closeModal, showModal } from "../../store/app/appSlice";
import { fileToBase64 } from "../../utils/helpers";

const CreateProduct = () => {
  const { categories, brands } = useSelector((state) => state.app);
  console.log(categories);
  console.log(brands);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef();
  const [hoverImg, setHoverImg] = useState("");
  const [previewImg, setPreviewImg] = useState({
    thumb: null,
    images: [],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm();
  const handleCreateData = async (data) => {
    if (data.category) {
      data.category = categories?.find((el) => el._id === data.category)?.title;
    }
    const formData = new FormData();

    for (let i of Object.entries(data)) {
      formData.append(i[0], i[1]);
    }
    if (data.thumb) formData.append("thumb", data.thumb[0]);
    if (data.images) {
      for (let image of data.images) {
        formData.append("images", image);
      }
    }
    dispatch(showModal({ modalChildren: <Loading /> }));
    const res = await apiCreateProduct(formData);

    if (res.success) {
      reset();
      toast.success(res.mes);
      setPreviewImg({ thumb: null, images: [] });
      editorRef.current?.setData(""); // Reset the CKEditor content
      dispatch(closeModal({ modalChildren: null }));
    } else {
      toast.error(res.mes);
    }
    // console.log(res);
    // console.log(formData);
    // console.log(data);
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
      imagesPreviews.push({ name: file.name, path: base64Thumb });
    }

    setPreviewImg((prev) => ({ ...prev, images: imagesPreviews }));
  };
  // const handleRemoveImg = (name) => {
  //   const files = [...watch("images")];
  //   reset({
  //     images: files?.filter((img) => img.name !== name),
  //   });

  //   if (previewImg.images?.some((img) => img.name === name)) {
  //     const newImages = previewImg.images?.filter(
  //       (image) => image.name !== name
  //     );
  //     setPreviewImg((prev) => ({ ...prev, images: newImages }));
  //   }
  // };
  useEffect(() => {
    if (watch("thumb").length > 0) {
      handlePreviewThumb(watch("thumb")[0]);
    }
  }, [watch("thumb")]);
  useEffect(() => {
    if (watch("images").length > 0) {
      handlePreviewImg(watch("images"));
    }
  }, [watch("images")]);
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
              options={brands?.map((brand) => ({
                code: brand.title,
                value: brand.title,
              }))}
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
                render={({ field, value }) => (
                  <>
                    <CKEditor
                      editor={ClassicEditor}
                      data={value}
                      onReady={(editor) => {
                        editorRef.current = editor; // Store the editor instance in the ref
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        field.onChange(data); // Update the React Hook Form field
                      }}
                      config={{ initialHeight: "500px" }}
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
            <input
              type="file"
              name="thumb"
              {...register("thumb", { required: "Please fill this field." })}
            />
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
            <input
              type="file"
              name="images"
              {...register("images", {})}
              multiple
            />
            {previewImg.images.length > 0 && (
              <div className="my-4 flex items-center gap-1 w-full">
                {previewImg.images?.map((image, index) => {
                  return (
                    <div
                      className="w-fit relative"
                      key={index}
                      onMouseEnter={() => setHoverImg(image.name)}
                      onMouseLeave={() => setHoverImg("")}
                    >
                      <img
                        src={image.path}
                        alt="images"
                        className="w-[200px] object-contain "
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
          <div className="mt-8">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;

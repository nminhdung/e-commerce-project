import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputForm, Paginate } from "../../components";
import {
  useNavigate,
  useSearchParams,
  useLocation,
  createSearchParams,
} from "react-router-dom";
import { apiGetProducts, apiDeleteProduct } from "../../api";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { BiEdit, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import useDebounce from "../../hooks/useDebounce";
import moment from "moment";
import EditProduct from "./EditProduct";
import _ from "lodash";
import Swal from "sweetalert2";

const ManageProducts = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();
  const [listProduct, setListProduct] = useState(null);
  const [countProduct, setCountProduct] = useState(0);
  const [editProduct, setEditProduct] = useState(null);

  const [isUpdate, setIsUpdate] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchProducts = async (params) => {
    const res = await apiGetProducts({
      ...params,
      limit: process.env.REACT_APP_ITEM_PERPAGE,
    });
    if (res.success) {
      setListProduct(res.listProduct);
      setCountProduct(res.counts);
    }
  };
  const handleSort = (sortBy, sortField) => {
    let newList = [...listProduct];
    newList = _.orderBy(newList, [sortField], [sortBy]);

    setListProduct(newList);
  };
  const render = useCallback(() => {
    setIsUpdate(!isUpdate);
  }, [isUpdate]);
  const handleDelete = async (pid) => {
    Swal.fire({
      title: "Are you sure",
      text: "Do you want to remove this product",
      icon: "warning",
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const res = await apiDeleteProduct(pid);
        if (res.success) {
          toast.success(res.mes);
          render();
        } else {
          toast.error(res.mes);
        }
      }
    });
  };
  const searchValue = useDebounce(watch("search"), 1000);
  useEffect(() => {
    if (searchValue) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ search: searchValue }).toString(),
      });
    } else {
      navigate({
        pathname: location.pathname,
      });
    }
  }, [searchValue]);
  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);

    //   searchParams.page = +params.get("page") || 1;
    //   console.log(countProduct)
    //   searchParams.search = searchValue;
    //   navigate({
    //     pathname: location.pathname,
    //     search: createSearchParams(searchParams).toString(),
    //   });
    // } else {
    //   if (!isEdit) {
    //     searchParams.page = +params.get("page") || 1;
    //   }else{
    //    delete searchParams.page
    //   }
    //   navigate({
    //     pathname: location.pathname,
    //     search: createSearchParams(searchParams).toString(),
    //   });
    // }
    // console.log(searchParams);
    fetchProducts(searchParams);
  }, [params, isUpdate]);
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="capitalize text-3xl p-4 flex items-center border-main border-b-2">
        {editProduct ? "Update Product" : "Manage Users"}
      </h1>
      <div className="flex w-full px-4 flex-col ">
        {!editProduct && (
          <form className="w-[45%]">
            <InputForm
              name="search"
              register={register}
              errors={errors}
              placeholder="Search products by title, category...."
              fullWidth
            />
          </form>
        )}
        {!editProduct ? (
          <table className="table-auto mb-2 text-left w-full">
            <thead className="table-auto border mb-2 text-center w-full bg-black">
              <tr>
                <th className="px-4 py-2 border-r">#</th>
                <th className="px-4 py-2 border-r">Avatar</th>
                <th className="px-4 py-2 border-r flex gap-1 items-center justify-between ">
                  Title
                  <div className="flex items-center gap-1">
                    <span
                      onClick={() => handleSort("desc", "title")}
                      className="cursor-pointer"
                    >
                      <FaAngleUp />
                    </span>
                    <span
                      onClick={() => handleSort("asc", "title")}
                      className="cursor-pointer"
                    >
                      <FaAngleDown />
                    </span>
                  </div>
                </th>
                <th className="px-4 py-2 border-r">Category</th>
                <th className="px-4 py-2 border-r">Brand</th>
                <th className="px-4 py-2 border-r flex gap-1 items-center">
                  Price
                  <div className="flex items-center  gap-1 justify-between ">
                    <span
                      onClick={() => handleSort("desc", "price")}
                      className="cursor-pointer"
                    >
                      <FaAngleUp />
                    </span>
                    <span
                      onClick={() => handleSort("asc", "price")}
                      className="cursor-pointer"
                    >
                      <FaAngleDown />
                    </span>
                  </div>
                </th>
                <th className="px-4 py-2 border-r">Color</th>
                <th className="px-4 py-2 border-r">Ratings</th>
                <th className="px-4 py-2 border-r">Created at</th>
                <th className="px-4 py-2 border-r">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listProduct?.map((product, index) => {
                return (
                  <tr key={product._id} className="border">
                    <td className="py-2 px-4 border-r">
                      {((params.get("page") || 1) - 1) *
                        process.env.REACT_APP_ITEM_PERPAGE +
                        index +
                        1}
                    </td>
                    <td className="py-2 px-4 border-r">
                      <img
                        src={product.thumb}
                        alt="thumb"
                        className="w-[50px] h-[50px] object-cover"
                      />
                    </td>
                    <td className="py-2 px-4 border-r text-[14px]">
                      {product.title}
                    </td>
                    <td className="py-2 px-4 border-r ">{product.category}</td>
                    <td className="py-2 px-4 border-r">{product.brand}</td>
                    <td className="py-2 px-4 border-r">{product.price}</td>
                    <td className="py-2 px-4 border-r">{product.color}</td>
                    <td className="py-2 px-4 border-r">
                      {product.totalRatings}
                    </td>
                    <td className="py-2 px-4 border-r">
                      {moment(product.createdAt).format("DD/MM/YYYY")}
                    </td>
                    <td className="py-2 px-4 border-r f ">
                      <div className="flex items-center gap-1 justify-center">
                       
                        <span
                          onClick={() => {
                            setEditProduct(product);
                            setIsUpdate(true);
                          }}
                          className=" hover:underline text-orange-400   cursor-pointer"
                        >
                          <BiEdit className="text-2xl" />
                        </span>
                        <span
                          onClick={() => handleDelete(product._id)}
                          className=" hover:underline text-main   cursor-pointer"
                        >
                          <BiTrash className="text-2xl" />
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <EditProduct
            editProduct={editProduct}
            isUpdate={isUpdate}
            setEditProduct={setEditProduct}
            render={render}
          />
        )}

        {!editProduct && (
          <div className="w-full my-6">
            <Paginate totalProduct={countProduct} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;

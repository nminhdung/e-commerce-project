/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useSelector } from "react-redux";
import {
  Banner,
  DealDaily,
  Sidebar,
  FeatureProducts,
  NewArrivals,
} from "../../components";

import BestSeller from "../../components/BestSeller";
import icons from "../../utils/icons";

const { FaAngleRight } = icons;

const Home = () => {
  const newProducts = useSelector((state) => state.products.products);
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const categories = useSelector((state) => state.app.categories).filter(
    (el) => el.brand.length > 0
  );
  return (
    <>
      <div className=" w-full lg:w-main grid grid-cols-10 gap-4">
        <div className="hidden lg:block lg:col-span-3">
          <Sidebar />
        </div>
        <div className="col-span-10 lg:col-span-7 ">
          <Banner />
        </div>
      </div>

      <div className="w-full lg:w-main grid grid-cols-10 gap-4 mt-6">
        <div className="col-span-10 lg:col-span-3">
          <DealDaily />
        </div>

        <div className=" col-span-10 lg:col-span-7 ">
          <BestSeller />
        </div>
      </div>
      <div className="my-8 w-full lg:w-main">
        <FeatureProducts />
      </div>
      <div className="my-8 w-full lg:w-main">
        <NewArrivals products={newProducts} />
      </div>
      <div className="my-8 w-full lg:w-main">
        <h3 className="font-semibold capitalize text-[20px] border-b-2 border-main cursor-pointer text-black">
          hot collections
        </h3>
        <div className="grid lg:grid-cols-3 gap-4 mt-4">
          {categories.map((cate) => {
            return (
              <div key={cate._id} className="border flex p-8 gap-4 ">
                <img
                  src={cate.image}
                  alt="cate-image"
                  className="object-contain max-w-[180px] max-h-[150px] "
                />
                <div className="text-gray-700">
                  <h3 className="text-base uppercase font-semibold">
                    {cate.title}
                  </h3>

                  <ul>
                    {cate.brand.map((brand, index) => {
                      return (
                        <li
                          key={index}
                          className="flex items-center gap-1 text-gray-500"
                        >
                          <FaAngleRight size={15} />
                          {brand}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-8 w-full lg:w-main">
        <h3 className="font-semibold capitalize text-[20px] border-b-2 border-main cursor-pointer text-black">
          blog posts
        </h3>
      </div>
    </>
  );
};

export default Home;

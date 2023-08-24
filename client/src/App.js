import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  Blogs,
  Services,
  Products,
  FAQ,
  ProductDetail,
  ConfirmRegister,
  ResetPassword,
  Checkout,
} from "./pages/public";
import {
  AdminLayout,
  CreateProduct,
  Dashboard,
  ManageProducts,
  ManageUsers,
} from "./pages/admin";
import { Cart, MemberLayout, Personal } from "./pages/member";
import { CartUi } from "./components";
import { getCategories } from "./store/app/asyncThunks";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import path from "./utils/paths";
import { Modal } from "./components";
import { getSubTotal, showCart } from "./store/app/appSlice";
import { showCartUi } from "./store/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren, isShowCart } = useSelector(
    (state) => state.app
  );
  const { isShow } = useSelector((state) => state.cart);
  const { isLoggedIn, current } = useSelector((state) => state.user);
  // useEffect(() => {
  //   if (current) {
  //     if (current?.cart?.length === 0) {
  //       dispatch(getSubTotal([]));
  //     } else {
  //       dispatch(getSubTotal([...current.cart]));
  //     }
  //   }
  // }, [current]);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <>
      <div className=" font-main relative ">
        {isShowModal && <Modal modalChildren={modalChildren} />}
        {isShow && (
          <div
            className="fixed inset-0 bg-overlay z-40"
            onClick={() => {
              dispatch(showCartUi("close"));
              // dispatch(showCart("close"));
            }}
          >
            <CartUi />
          </div>
        )}

        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.BLOGS} element={<Blogs />} />
            <Route path={path.FAQ} element={<FAQ />} />
            <Route path={path.OUR_SERVICES} element={<Services />} />
            <Route path={path.PRODUCTS} element={<Products />} />
            <Route path={path.CHECKOUT} element={<Checkout/>}/>
            <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
            <Route
              path={path.PRODUCT_DETAIL_CATEGORY_PID_TITLE}
              element={<ProductDetail />}
            />
            <Route path={path.MEMBER} element={<MemberLayout />}>
              <Route path={path.PERSONAL} element={<Personal />} />
              <Route path={path.CART} element={<Cart />} />
            </Route>
          </Route>
          <Route path={path.LOGIN} element={<Login />} />

          <Route path={path.ADMIN} element={<AdminLayout />}>
            <Route path={path.DASHBOARD} element={<Dashboard />} />
            <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />} />

            <Route path={path.MANAGE_USERS} element={<ManageUsers />} />

            <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
          </Route>

          <Route path={path.CONFIRM_REGISTER} element={<ConfirmRegister />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

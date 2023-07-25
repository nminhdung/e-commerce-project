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
} from "./pages/public";
import {
  AdminLayout,
  CreateProduct,
  Dashboard,
  ManageProducts,
  ManageUsers,
 
} from "./pages/admin";
import { MemberLayout, Personal } from "./pages/member";
import { getCategories } from "./store/app/asyncThunks";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import path from "./utils/paths";
import { Modal } from "./components";

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <>
      <div className=" font-main overflow-hidden relative ">
        {isShowModal && <Modal modalChildren={modalChildren} />}
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.BLOGS} element={<Blogs />} />
            <Route path={path.FAQ} element={<FAQ />} />
            <Route path={path.OUR_SERVICES} element={<Services />} />
            <Route path={path.PRODUCTS} element={<Products />} />
            <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
            <Route
              path={path.PRODUCT_DETAIL_CATEGORY_PID_TITLE}
              element={<ProductDetail />}
            />
          </Route>
          <Route path={path.ADMIN} element={<AdminLayout />}>
            <Route path={path.DASHBOARD} element={<Dashboard />} />
            <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />} />

            <Route path={path.MANAGE_USERS} element={<ManageUsers />} />

            <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
          </Route>
          <Route path={path.MEMBER} element={<MemberLayout />}>
            <Route path={path.PERSONAL} element={<Personal />} />
          </Route>
          <Route path={path.CONFIRM_REGISTER} element={<ConfirmRegister />} />
          <Route path={path.LOGIN} element={<Login />} />
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

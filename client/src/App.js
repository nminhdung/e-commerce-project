import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Home, Public,Blogs,Services,Products,FAQ,ProductDetail } from "./pages/public";
import { getCategories } from "./store/app/asyncThunks";
import { useDispatch } from "react-redux";
import path from "./utils/paths";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div className="min-h-screen font-main ">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.PRODUCT_DETAIL_PID_TITLE} element={<ProductDetail />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />

      </Routes>
    </div>
  );
}

export default App;

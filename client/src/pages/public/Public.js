import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation } from "../../components";
import { getCategories } from "../../store/asyncThunks";
import { useDispatch } from "react-redux";
const Public = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <Navigation />
      <div className="w-main">
        <Outlet />
      </div>
    </div>
  );
};

export default Public;

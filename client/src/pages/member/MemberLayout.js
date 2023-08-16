import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import {
  Footer,
  Header,
  MemberSidebar,
  Navigation,
  TopHeader,
} from "../../components";
import path from "../../utils/paths";

const MemberLayout = () => {
  const { current, isLoggedIn } = useSelector((state) => state.user);
  console.log({ isLoggedIn, current });
  if (!isLoggedIn || !current) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div className="grid grid-cols-3 xl:w-main w-full mx-auto gap-2 mb-[200px]">
      <div className="col-span-1 w-full min-h-[800px]">
        <MemberSidebar />
      </div>

      <div className="col-span-2 w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;

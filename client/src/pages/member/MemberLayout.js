import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { MemberSidebar } from "../../components";
import path from "../../utils/paths";

const MemberLayout = () => {
  const { current, isLoggedIn } = useSelector((state) => state.user);
  console.log({ isLoggedIn, current });
  if (!isLoggedIn || !current) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div className="flex">
      <div className="w-[330px] top-0 bottom-0 fixed">
        <MemberSidebar />
      </div>
      <div className="w-[330px] "></div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;

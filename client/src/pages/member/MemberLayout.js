import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import path from "../../utils/paths";

const MemberLayout = () => {
  const { current, isLoggedIn } = useSelector((state) => state.user);
  console.log({isLoggedIn,current})
  if (!isLoggedIn || !current) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div>
      MemberLayout
      <Outlet />
    </div>
  );
};

export default MemberLayout;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import path from "../../utils/paths";
const AdminLayout = () => {
  const { current, isLoggedIn } = useSelector((state) => state.user);
  if (!isLoggedIn || !current || +current.role !== 12) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div>
      <div>Admin layout</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AdminSidebar } from "../../components";
import path from "../../utils/paths";
const AdminLayout = () => {
  const { current, isLoggedIn } = useSelector((state) => state.user);
  if (!isLoggedIn || !current || +current.role !== 12) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div className="w-full flex bg-zinc-700 relative min-h-screen text-white">
      <div className="w-[330px] top-0 bottom-0 fixed">
        <AdminSidebar />
      </div>
      <div className="w-[330px] "></div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

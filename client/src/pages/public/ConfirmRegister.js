import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import path from "../../utils/paths";
import { toast } from "react-toastify";
const ConfirmRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "failed") {
      toast.error("Signup Failed");
      navigate(`/${path.LOGIN}`);
    } else {
      toast.success("Signup Succeed");
      navigate(`/${path.LOGIN}`);
    }
  }, []);
  return <div className="h-screen bg-gray-100"></div>;
};

export default ConfirmRegister;

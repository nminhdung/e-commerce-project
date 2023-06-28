import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { apiResetPassword } from "../../api/user";
import { toast } from "react-toastify";
import path from "../../utils/paths";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const handleResetPassword = async () => {
    if (newPassword.trim() !== confirmPassword.trim()) {
      toast.error("Confirm password failed");
      return;
    }
    // console.log({newPassword,token})
    const response = await apiResetPassword({ password: newPassword, token });
    if (response.success) {
      toast.success(response.mes, { theme: "colored" });
      navigate(`/${path.LOGIN}`);
    } else {
      toast.error(response.mes, { theme: "colored" });
    }
  };
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-white flex justify-center items-center py-8 z-50 animate-slide-right">
      <div className="flex flex-col gap-4 bg-white shadow-md  p-4">
        <label htmlFor="password">Enter your new password</label>
        <input
          type="text"
          id="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-[800px] p-2 border outline-none rounded-full"
          placeholder="Type here"
        />
        <label htmlFor="confirmpassword">Confirm new password</label>

        <input
          type="text"
          id="confirmpassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-[800px] p-2 border outline-none rounded-full"
          placeholder="Type here"
        />
        <div className="self-end space-x-2">
          <Button
            // eslint-disable-next-line react/style-prop-object
            style="bg-blue-500 px-4 py-2 rounded-md font-semibold text-white"
            handleClick={handleResetPassword}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

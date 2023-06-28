import React, { useCallback } from "react";
import path from "../../utils/paths";
import { useState } from "react";
import { toast } from "react-toastify";
import { InputField, Button } from "../../components";
import { apiRegister, apiLogin, apiForgotPassword } from "../../api/user";
import { useNavigate, useLocation } from "react-router-dom";
import { register } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
  });
  const [isRegister, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phone: "",
    });
  };

  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    if (response.success) {
      toast.success(response.mes, { theme: "colored" });
      setIsForgotPassword(false);
    } else {
      toast.info(response.mes, { theme: "colored" });
    }
  };
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, phone, ...data } = payload;
    if (isRegister) {
      const response = await apiRegister(payload);
      if (response.success) {
        toast.success(response.mes);
        resetPayload();
        setRegister(false);
      } else {
        toast.error(response.mes);
      }
    } else {
      const rs = await apiLogin(data);
      if (rs.success) {
        dispatch(
          register({
            isLoggedIn: true,
            token: rs.accessToken,
            current: rs.userData,
          })
        );
        navigate(`/${path.HOME}`);
      } else {
        toast.error(rs.mes);
      }
    }
  }, [payload, isRegister]);
  return (
    <div className="w-screen h-screen relative">
      {isForgotPassword && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-white flex justify-center items-center py-8 z-50 animate-slide-right">
          <div className="flex flex-col gap-4 bg-white shadow-md  p-4">
            <label htmlFor="email">Enter your email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[800px] p-2 border outline-none rounded-full"
              placeholder="Exp:email@gmail.com"
            />
            <div className="self-end space-x-2">
              <Button handleClick={() => setIsForgotPassword(false)}>
                Back
              </Button>
              <Button
                // eslint-disable-next-line react/style-prop-object
                style="bg-blue-500 px-4 py-2 rounded-md font-semibold text-white"
                handleClick={handleForgotPassword}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}

      <img
        src="https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt=""
        className="w-full h-full  object-cover"
      />
      <div className="absolute top-0 bottom-0 lef-0 right-1/2 flex items-center">
        <div className="p-8 bg-white rounded-md min-w-[500px] flex flex-col items-center">
          <h1 className="text-[28px] font-semibold  text-main mb-8 ">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <div className="flex items-center gap-2">
              <InputField
                value={payload.firstname}
                setValue={setPayload}
                nameKey="firstname"
              />
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                nameKey="lastname"
              />
            </div>
          )}

          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
          />
          {isRegister && (
            <InputField
              value={payload.phone}
              setValue={setPayload}
              nameKey="phone"
            />
          )}

          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
          />

          <Button handleClick={handleSubmit} fullWidth>
            {isRegister ? "Register" : "Login"}
          </Button>
          <div className="flex justify-between items-center my-2 w-full text-sm">
            {isRegister ? (
              ""
            ) : (
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setIsForgotPassword(true)}
              >
                Forgot your password ?
              </span>
            )}
            {isRegister ? (
              <span
                onClick={() => setRegister(false)}
                className="text-blue-500 hover:underline cursor-pointer w-full text-center"
              >
                Go Login
              </span>
            ) : (
              <span
                onClick={() => setRegister(true)}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Create account
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

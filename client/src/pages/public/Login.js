import React, { useCallback, useEffect } from "react";
import path from "../../utils/paths";
import { useState } from "react";
import { toast } from "react-toastify";
import { InputField, Button } from "../../components";
import icons from "../../utils/icons";
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiConfirmRegister,
} from "../../api/user";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { validateInput } from "../../utils/helpers";

const { AiOutlineCloseCircle, AiFillHome } = icons;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [tokenConfirm, setTokenConfirm] = useState("");
  const [isVerifyEmail, setVerifyEmail] = useState(false);
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

  const [invalidFields, setInvalidFields] = useState([]);
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    if (response.success) {
      toast.success(response.mes, { theme: "colored" });
      setIsForgotPassword(false);
    } else {
      toast.info(response.mes, { theme: "colored" });
    }
  };
  useEffect(() => {
    resetPayload();
  }, [isRegister]);
  // Submit
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, phone, ...data } = payload;
    const invalids = isRegister
      ? validateInput(payload, setInvalidFields)
      : validateInput(data, setInvalidFields);

    if (invalids === 0) {
      if (isRegister) {
        const response = await apiRegister(payload);
        if (response.success) {
          setVerifyEmail(true);
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
            login({
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
    }
  }, [payload, isRegister]);

  const handleConfirmRegister = async () => {
    const response = await apiConfirmRegister(tokenConfirm);
    if (response.success) {
      setVerifyEmail(false);
      toast.success(response.mes);
      resetPayload();
      setRegister(false);
    } else {
      toast.error(response.mes);
    }
    setTokenConfirm("");
  };

  return (
    <div className="w-screen h-screen relative">
      {isVerifyEmail && (
        <div className="bg-overlay absolute top-0 left-0 right-0 bottom-0 z-50 flex flex-col justify-center items-center">
          <div className="bg-white p-8 w-[500px] rounded-md relative">
            <h3 className="text-[14px] mb-2">
              We sent a code to your email. Please check your email and enter
              your code.
            </h3>
            <AiOutlineCloseCircle
              size={20}
              className="absolute right-2 top-2 cursor-pointer"
              color="red"
              onClick={() => setVerifyEmail(false)}
            />
            <input
              type="text"
              value={tokenConfirm}
              onChange={(e) => setTokenConfirm(e.target.value)}
              className="rounded-md p-2 outline-none border  border-main w-[310px] "
            />
            <button
              onClick={handleConfirmRegister}
              className="px-4 py-2 bg-blue-500 font-semibold rounded-md text-white ml-4 "
            >
              submit
            </button>
          </div>
        </div>
      )}

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
      <div className="absolute top-0 bottom-0 lef-0 right-1/2 flex items-center ">
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
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                nameKey="lastname"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            </div>
          )}

          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          {isRegister && (
            <InputField
              value={payload.phone}
              setValue={setPayload}
              nameKey="phone"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          )}

          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />

          <Button handleClick={handleSubmit} fullWidth>
            {isRegister ? "Register" : "Login"}
          </Button>
          <div className="flex justify-between items-center my-2 w-full text-sm">
            {!isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setIsForgotPassword(true)}
              >
                Forgot your password ?
              </span>
            )}
            {isRegister && (
              <span
                onClick={() => setRegister(false)}
                className="text-blue-500 hover:underline cursor-pointer w-full text-center"
              >
                Go Login
              </span>
            )}
            {!isRegister && (
              <span
                onClick={() => setRegister(true)}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Create account
              </span>
            )}
          </div>
          <Link
            to={`/${path.HOME}`}
            className="text-sm hover:underline cursor-pointer flex gap-2 
            w-full justify-center items-center bg-black text-white py-4 px-2 rounded-md"
          >
            <AiFillHome size={16} /> Go Home
          </Link>
        </div>
      </div>
    </div>
    //validate bằng formik : https://codesandbox.io/s/formik-v2-tutorial-final-ge1pt?file=/src/index.js:539-548
  );
};

export default Login;

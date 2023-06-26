import React, { useCallback } from "react";
import { useState } from "react";
import { InputField, Button } from "../../components";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isRegister, setRegister] = useState(false);
  const handleSubmit = useCallback(() => {
    console.log(payload);
  }, [payload]);
  return (
    <div className="w-screen h-screen">
      <img
        src="https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt=""
        className="w-full h-full relative object-cover"
      />
      <div className="absolute top-0 bottom-0 lef-0 right-1/2 flex items-center">
        <div className="p-8 bg-white rounded-md min-w-[500px] flex flex-col items-center">
          <h1 className="text-[28px] font-semibold  text-main mb-8 ">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <InputField
              value={payload.name}
              setValue={setPayload}
              nameKey="name"
            />
          )}

          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
          />
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
          />

          <Button
            name={isRegister ? "Register" : "Login"}
            handleClick={handleSubmit}
            fullWidth
          />
          <div className="flex justify-between items-center my-2 w-full text-sm">
            {isRegister ? (
              ""
            ) : (
              <span className="text-blue-500 hover:underline cursor-pointer">
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

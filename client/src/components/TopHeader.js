import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import path from "../utils/paths";
import { getCurrentUser } from "../store/user/asyncThunk";
import { useDispatch, useSelector } from "react-redux";
import { clearMess, logout } from "../store/user/userSlice";
import icons from "../utils/icons";
import { toast } from "react-toastify";

const { AiOutlineLogout } = icons;
const TopHeader = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, current, mes } = useSelector((state) => state.user);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) {
        dispatch(getCurrentUser());
      }
    }, 500);
    return () => clearTimeout(setTimeoutId);
  }, [dispatch, isLoggedIn]);
  useEffect(() => {
    if (mes) {
      dispatch(clearMess());
      toast.warning(() => {
        return (
          <div className="gap-1">
            <span>{mes}</span>
            <Link
              to={`/${path.LOGIN}`}
              className="underline rounded-md text-blue-500 ml-2"
            >
              Go to login
            </Link>
          </div>
        );
      });
    }
  }, [mes]);
  return (
    <div className="hidden h-[38px] w-full bg-main lg:flex justify-center items-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <div className="flex items-center gap-2">
          <span className="pr-2 border-r">
            ORDER ONLINE OR CALL US (+1800) 000 8808{" "}
          </span>
          <span>VND</span>
        </div>
        <div className="flex items-center ">
          {isLoggedIn && current ? (
            <div className="flex items-center gap-2 text-sm">
              <span>{`Welcome, ${current?.firstname} ${current?.lastname}`}</span>
              <span
                onClick={() => {
                  dispatch(logout());
                }}
                className="hover:rounded-full hover:bg-gray-200 hover:text-main p-2 cursor-pointer"
              >
                <AiOutlineLogout size={18} />
              </span>
            </div>
          ) : (
            <Link
              to={`/${path.LOGIN}`}
              className="hover:text-gray-800 transition duration-300"
            >
              Sign In or Create Account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(TopHeader);

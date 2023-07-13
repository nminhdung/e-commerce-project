import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../store/app/appSlice";

const Modal = ({ modalChildren }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(closeModal({ modalChildren: null }))}
      className="absolute top-0 left-0 w-full h-full bg-overlay z-50 flex items-center justify-center"
    >
      {modalChildren}
    </div>
  );
};

export default memo(Modal);

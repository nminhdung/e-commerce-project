import React, { memo, useEffect, useRef, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { voteOptions } from "../../utils/constants";
import { closeModal } from "../../store/app/appSlice";
import logo from "../../assets/logo.png";
import path from "../../utils/paths";
import Button from "../Button";

const VoteOption = ({ nameProduct, handleSubmitVote }) => {
  const [chosenStar, setChosenStar] = useState(0);
  const [comment, setComment] = useState(0);
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef();

  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className="bg-white max-w-[700px]  p-4 flex flex-col items-center gap-4 justify-center"
    >
            <img src={logo} alt="logo" className="object-cover" />
      {isLoggedIn ? (
        <>
  
          <h2 className="text-center font-medium text-lg">{`Voting product ${nameProduct}`}</h2>
          <textarea
            className="outline-blue-500 border-2 w-full placeholder:text-xs placeholder:italic p-2"
            placeholder="Type something..."
            cols={30}
            rows={3}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="w-full flex flex-col gap-4 ">
            <p>How do you feel this product ?</p>
            <div className="flex items-center justify-center gap-4">
              {voteOptions.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex p-4 bg-gray-200 hover:bg-gray-300 
                h-[100px] w-[100px] flex-col items-center gap-4 justify-center cursor-pointer"
                    onClick={() => setChosenStar(item.id)}
                  >
                    {item.id <= chosenStar ? (
                      <AiFillStar color="orange" />
                    ) : (
                      <AiFillStar color="gray" />
                    )}
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <Button
            handleClick={() => handleSubmitVote({ comment, star: chosenStar })}
            fullWidth
          >
            Submit
          </Button>
        </>
      ) : (
        <>
          <p className="text-xl font-semibold">Please login to vote</p>
          <Button
            handleClick={() => {
              navigate(`/${path.LOGIN}`);
              dispatch(closeModal({ modalChildren: null }));
            }}
            fullWidth
          >
            {" "}
            Login
          </Button>
        </>
      )}
    </div>
  );
};

export default memo(VoteOption);

import React, { memo, useState } from "react";
import { productInfo } from "../utils/constants";
import { Comment, VoteBar, VoteOption } from "./Vote";
import { renderStarFromNumber } from "../utils/helpers";
import { Button } from "./";
import { closeModal, showModal } from "../store/app/appSlice";
import { toast } from "react-toastify";
import { apiRating } from "../api";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductInformation = ({
  productDescription,
  totalRatings,
  ratingsList,
  nameProduct,
  pid,
  rerender,
}) => {
  const dispatch = useDispatch();

  const [activedTab, setActivetab] = useState(1);

  const handleSubmitVote = async (value) => {
    const { comment, star } = value;
    if (!comment || !star || !pid) {
      toast.info("Please vote when click submit", { theme: "colored" });
      return;
    } else {
      const response = await apiRating({
        comment,
        star,
        pid,
        updatedAt: Date.now(),
      });
      if (response.status) {
        toast.success("Successfully Voted", { theme: "colored" });
        dispatch(closeModal({ modalChildren: null }));
        rerender();
      }
    }
  };
  return (
    <div className="">
      <div className="flex flex-col md:flex-row items-center gap-2 relative bottom-[-1px] ">
        {productInfo.map((item) => {
          return (
            <p
              className={`py-2 px-5 uppercase w-full md:w-fit cursor-pointer hover:bg-white transition duration-400 ${
                activedTab === item.id
                  ? "bg-white border border-b-0"
                  : "bg-[#f1f1f1]"
              }`}
              onClick={() => setActivetab(item.id)}
              key={item.id}
            >
              {item.title}
            </p>
          );
        })}
      </div>
      <div className="w-full min-h-[300px] border p-4 transition duration-400">
        {productInfo.find((item) => item.id === activedTab)?.content}
        {!productInfo.find((item) => item.id === activedTab)?.content && (
          <ul className="list-square pl-4 ">
            {productDescription?.map((desc, index) => {
              return <li key={index} className="text-xs md:text-sm">{desc}</li>;
            })}
          </ul>
        )}
      </div>
      <div className="flex flex-col xl:w-main mt-4">
        <p className="text-white uppercase bg-main p-2 text-center">
          Customer Review
        </p>
        <div className="flex md:flex-row  flex-col ">
          <div className="flex-4 border border-red-500 flex flex-col items-center justify-center gap-2">
            <p className="text-3xl md:text-2xl   font-semibold">
              <span className="text-main">{`${totalRatings}`} </span>/5
            </p>
            <div className="flex gap-1 items-center">
              {renderStarFromNumber(totalRatings).map((item, index) => {
                return <span key={index}>{item}</span>;
              })}
            </div>
            <span>{ratingsList?.length} reviewers</span>
          </div>
          <div className="flex-6 border flex flex-col p-4 gap-2">
            {Array.from(Array(5).keys())
              .reverse()
              .map((item, index) => {
                return (
                  <VoteBar
                    key={index}
                    number={item + 1}
                    ratingTotal={ratingsList?.length}
                    ratingCount={
                      ratingsList?.filter((element) => element.star === item + 1)
                        ?.length
                    }
                  />
                );
              })}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 p-4">
        <span>Do you want to review this product ?</span>
        <Button
          handleClick={() =>
            dispatch(
              showModal({
                modalChildren: (
                  <VoteOption
                    nameProduct={nameProduct}
                    handleSubmitVote={handleSubmitVote}
                  />
                ),
              })
            )
          }
        >
          Vote now!
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {ratingsList?.map((item) => {
          return (
            <Comment
              key={item._id}
              star={item.star}
              comment={item.comment}
              updatedAt={item.updatedAt}
              name={`${item.postedBy?.firstname} ${item.postedBy?.lastname}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(ProductInformation);

import React, { memo, useState } from "react";
import { productInfo } from "../utils/constants";
import { VoteBar, VoteOption } from "./Vote";
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
  ratings,
  nameProduct,
  pid,
  rerender
}) => {
  const dispatch = useDispatch();

  const [activedTab, setActivetab] = useState(1);

  const handleSubmitVote = async (value) => {
    const { comment, star } = value;
    if (!comment || !star || !pid) {
      toast.info("Please vote when click submit", { theme: "colored" });
      return;
    } else {
      const response = await apiRating({ comment, star, pid });
      if (response.status) {
        toast.success("Successfully Voted", { theme: "colored" });
        dispatch(closeModal({ modalChildren: null }));
        rerender();
      }
    }
  };
  return (
    <div className="">
      <div className="flex items-center gap-2 relative bottom-[-1px]">
        {productInfo.map((item) => {
          return (
            <p
              className={`py-2 px-5 uppercase  cursor-pointer hover:bg-white transition duration-400 ${
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
        <div
          className={`py-2 px-5 uppercase  cursor-pointer hover:bg-white transition duration-400 ${
            activedTab === 5 ? "bg-white border border-b-0" : "bg-[#f1f1f1]"
          }`}
          onClick={() => setActivetab(5)}
        >
          customer review
        </div>
      </div>
      <div className="w-full min-h-[300px] border p-4 transition duration-400">
        {productInfo.find((item) => item.id === activedTab)?.content}
        {!productInfo.find((item) => item.id === activedTab)?.content &&
          activedTab !== 5 && (
            <ul className="list-square pl-4 ">
              {productDescription?.map((desc, index) => {
                return <li key={index}>{desc}</li>;
              })}
            </ul>
          )}

        {activedTab === 5 && (
          <>
            {" "}
            <div className="flex p-4">
              <div className="flex-4 border border-red-500 flex flex-col items-center justify-center gap-2">
                <p className="text-3xl md:text-2xl   font-semibold">
                  <span className="text-main">{`${totalRatings}`} </span>/5
                </p>
                <div className="flex gap-1 items-center">
                  {renderStarFromNumber(totalRatings).map((item, index) => {
                    return <span key={index}>{item}</span>;
                  })}
                </div>
                <span>{ratings.length} reviewers</span>
              </div>
              <div className="flex-6 border flex flex-col p-4 gap-2">
                {Array.from(Array(5).keys())
                  .reverse()
                  .map((item, index) => {
                    return (
                      <VoteBar
                        key={index}
                        number={item + 1}
                        ratingTotal={ratings.length}
                        ratingCount={
                          ratings?.filter(
                            (element) => element.star === item + 1
                          ).length
                        }
                      />
                    );
                  })}
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
          </>
        )}
      </div>
    </div>
  );
};

export default memo(ProductInformation);

import React, { useEffect, useRef } from "react";
import { memo } from "react";
import { AiFillStar } from "react-icons/ai";

const VoteBar = ({ number, ratingCount, ratingTotal }) => {
  const percentRef = useRef();

  useEffect(() => {
    percentRef.current.style = `right: ${
     100 - Math.ceil(ratingCount * 100 / ratingTotal) 
    }%`;
  }, [ratingCount, ratingTotal]); 

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-1 items-center gap-1 text-sm">
        <span>{number}</span>
        <AiFillStar color="orange" />
      </div>
      <div className="flex-8">
        <div className="w-full relative h-[6px] bg-gray-200 rounded-xl">
          <div
            ref={percentRef}
            className="absolute top-0 left-0 bottom-0  bg-red-500"
          ></div>
        </div>
      </div>
      <div className="flex-2 text-xs">{`${ratingCount || 0} reviewers`}</div>
    </div>
  );
};

export default memo(VoteBar);

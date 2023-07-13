import React from "react";
import avatar from "../../assets/avatar-default.png";
import moment from "moment";
import { renderStarFromNumber } from "../../utils/helpers";

const Comment = ({
  image = avatar,
  name = "Anonymous",
  comment,
  updatedAt,
  star,
}) => {
  return (
    <div className="flex gap-4 ">
     
        <img
          src={image}
          alt="avatar"
          className="w-[40px] h-[40px] object-cover rounded-full"
        />

      <div className="flex flex-col flex-auto">
        <div className="flex flex-col gap-1 ">
          <h3 className="font-semibold">{name}</h3>
          <div className="flex gap-1 items-center">
            <span className="font-semibold">Vote:</span>
            <div className="flex gap-1 items-center">
              {renderStarFromNumber(star).map((item, index) => {
                return <span key={index}>{item}</span>;
              })}
            </div>
          </div>
          <span className="text-gray-400 italic">
            {moment(updatedAt)?.fromNow()}
          </span>
        </div>
        <div className="border mt-4 py-2  bg-gray-100 pl-4 ">
          <span className="font-semibold">Comment:</span>
          <span className="font-normal ">{comment}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;

import React, { memo, useEffect, useState } from "react";
import moment from "moment";
import icons from "../../utils/icons";
import * as api from "../../api";
import { formatMoney, renderStarFromNumber } from "../../utils/helpers";
import CountDown  from "./CountDown";
import { secondsToHms } from "../../utils/helpers";

const { AiFillStar, AiOutlineMenu } = icons;
let idInterval;

const DealDaily = () => {
  const [productDealDaily, setProductDealDaily] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);

  const fetchDealDaily = async () => {
    const res = await api.apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 10),
      totalRatings: 5,
    });

    if (res.success) {
      setProductDealDaily(res.listProduct[0]);
      const today = `${moment().format("MM/DD/YYYY")} 7:00:00`;
      const seconds =
        new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
      const day = secondsToHms(seconds);
      setHour(day.h);
      setMinute(day.m);
      setSecond(day.s);
    } else {
      setHour(8);
      setMinute(59);
      setSecond(59);
    }
  };

  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchDealDaily();
  }, [expireTime]);
  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) {
        setSecond((prev) => prev - 1);
      } else {
        if (minute > 0) {
          setMinute((prevMinute) => prevMinute - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prevHour) => prevHour - 1);
            setMinute(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => clearInterval(idInterval);
  }, [second, minute, hour, expireTime]);
  return (
    <div className="w-full border flex-auto ">
      <div className="flex items-center justify-center p-4">
        <span className="flex-1 flex justify-center">
          <AiFillStar size={20} color="#DD1111" />
        </span>
        <span className="flex-8 flex justify-center font-semibold text-[20px]text-gray-700 w-full">
          Daily Deals
        </span>
        <span className="flex-1"></span>
      </div>
      <div className="w-full flex flex-col items-center pt-8 gap-2">
        <img
          src={productDealDaily?.thumb}
          alt="thumb"
          className="object-contain w-full"
        />
        <span className="line-clamp-1 text-center">
          {productDealDaily?.title}
        </span>

        <div className="flex gap-1 h-4">
          {renderStarFromNumber(productDealDaily?.totalRatings).map(
            (star, index) => {
              return (
                <span className=" h-[16px]" key={index}>
                  {star}
                </span>
              );
            }
          )}
        </div>
      </div>
      <div className="mt-8 px-4">
        <div className="flex items-center justify-center gap-2 mb-4 ">
          <CountDown unit="Hours" number={hour} />
          <CountDown unit="Minutes" number={minute} />
          <CountDown unit="Seconds" number={second} />
        </div>
        <button
          className="flex items-center gap-2 justify-center w-full text-white font-medium py-2
         bg-main hover:text-white hover:bg-black transition duration-500"
        >
          <AiOutlineMenu />
          Options
        </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);

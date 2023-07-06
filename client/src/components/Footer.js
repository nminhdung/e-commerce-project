import React, { memo } from "react";

import icons from "../utils/icons";

const { MdEmail, RiPhoneFill, MdLocationOn } = icons;
const Footer = () => {
  return (
    <div className="w-full ">
      <div className="h-[103px] bg-main w-full flex items-center justify-center">
        <div className="w-main flex justify-between items-center">
          <div className="flex flex-col flex-1 gap-1">
            <span className="text-white text-xs lg:text-[20px] tracking-[2px]">
              Sign up to Newsletter
            </span>
            <small className="text-[10px] lg:text-[13px] text-gray-300">
              Subscribe now and receive weekly newsletter
            </small>
          </div>
          <div className="flex items-center flex-1">
            <input
              className="p-4 pr-0 rounded-l-full border-none outline-none text-gray-100 w-full bg-[#F04646]
                placeholder:text-sm placeholder:text-gray-200 placeholder:opacity-50 placeholder:italic"
              type="text"
              placeholder="Email..."
            />
            <div className="w-[56px] h-[56px] bg-[#F04646] rounded-r-full flex items-center justify-center text-white">
              <MdEmail size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[400px] p-2 lg:p-0 bg-[#191919] w-full flex  items-center  justify-center text-[13px] text-white">
        <div className="w-full lg:w-main grid lg:grid-cols-5 gap-2 ">
          <div className="lg:col-span-2 flex flex-col gap-2">
            <h3 className="mb-5 text-[15px] border-l-4 border-main pl-[15px] uppercase">
              About us
            </h3>
            <p className="flex items-center gap-1">
              <span>
                <MdLocationOn size={16} />{" "}
              </span>
              Address:{" "}
              <span className="text-[#b7b7b7] lg:text-sm text-[12px]">
                474 Ontario St Toronto, ON M4X 1M7 Canada
              </span>
            </p>
            <p className="flex items-center gap-1">
              <span>
                <RiPhoneFill size={16} />
              </span>
              Phone: <span className="text-[#b7b7b7] lg:text-sm text-[12px]">(+1234)56789xxx</span>
            </p>
            <p className="flex items-center gap-1 lg:text-sm text-[12px]">
              <span>
                <MdEmail size={16} />
              </span>
              Mail: <span className="text-[#b7b7b7]">tadathemes@gmail.com</span>
            </p>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-2">
            <h3 className="mb-5 text-[15px] border-l-4 border-main pl-[15px] uppercase">
              Information
            </h3>
            <span className="text-[#b7b7b7] cursor-pointer hover:text-white transition duration-300">Typography</span>
            <span className="text-[#b7b7b7] cursor-pointer hover:text-white transition duration-300">Gallery</span>
            <span className="text-[#b7b7b7] cursor-pointer hover:text-white transition duration-300">Store Location</span>
            <span className="text-[#b7b7b7] cursor-pointer hover:text-white transition duration-300">Today's Deals</span>
            <span className="text-[#b7b7b7] cursor-pointer hover:text-white transition duration-300">Contact</span>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-2">
            <h3 className="mb-5 text-[15px] border-l-4 border-main pl-[15px] uppercase">
              Who we are
            </h3>
            <span className="text-[#b7b7b7] cursor-pointer hover:text-white transition duration-300">Help</span>
            <span className="text-[#b7b7b7] cursor-pointer hover:text-white transition duration-300">Free Shipping</span>
            <span className="text-[#b7b7b7] cursor-pointer hover:text-white transition duration-300">FAQs</span>
            <span className="text-[#b7b7b7] cursor-pointer hover:text-white transition duration-300">Return & Exchange </span>
            <span className="text-[#b7b7b7] cursor-pointer hover:text-white transition duration-300">Testimonials</span>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-2">
            <h3 className="mb-5 text-[15px] border-l-4 border-main pl-[15px] uppercase">
              #DigitalWorldStore
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);

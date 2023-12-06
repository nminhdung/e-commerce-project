/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import imgDefault from "../../assets/default.png"
import { BreadCumbs } from "../../components";
import { CiSettings } from "react-icons/ci";
import { AiOutlinePicture } from "react-icons/ai";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
const Services = () => {
  return (
    <div className='w-full mb-[200px]'>
      <div className="bg-gray-100 h-[81px] flex md:justify-center items-center">
        <div className="xl:w-main">
          <h3 className="font-bold">Services</h3>
          <BreadCumbs category="services" />
        </div>
      </div>
      <div className="xl:w-main mx-auto grid md:grid-cols-2 mt-8 gap-4">
        <img
          className="w-full object-cover"
          src={
            "https://media.istockphoto.com/id/1311598658/vi/anh/doanh-nh%C3%A2n-giao-d%E1%BB%8Bch-th%E1%BB%8B-tr%C6%B0%E1%BB%9Dng-ch%E1%BB%A9ng-kho%C3%A1n-tr%E1%BB%B1c-tuy%E1%BA%BFn-tr%C3%AAn-m%C3%A0n-h%C3%ACnh-teblet-kh%C3%A1i-ni%E1%BB%87m-%C4%91%E1%BA%A7u-t%C6%B0-k%E1%BB%B9.jpg?s=2048x2048&w=is&k=20&c=qTDwT8bCapRZpmdGvBUMgllbGRNy4r2RbEvR7oA5zYs="
            || imgDefault}
          alt="image-default" />
        <div className="font-medium flex flex-col gap-2 text-[16px]">
          <p>Cras magna tellus, congue vitae congue vel, facilisis id risus. Proin semper in lectus id faucibus. Aenean vitae quam eget mi aliquam viverra quis quis velit.</p>
          <p>Curabitur mauris diam, posuere vitae nunc eget, blandit pellentesque mi. Pellentesque placerat nulla at ultricies malesuada. Aenean mi lacus, malesuada at leo vel, blandit iaculis nisl.</p>
          <p>Praesent vestibulum nisl sed diam euismod, a auctor neque porta. Vestibulum varius ligula non orci tincidunt rutrum. Suspendisse placerat enim eu est egestas, aliquam venenatis elit accumsan. Donec metus quam, posuere sit amet odio et, ultricies consequat nibh.</p>
        </div>
      </div>
      <div className="xl:w-main mx-auto flex flex-col gap-2 mt-[40px]">
        <h1 className="flex items-center justify-center md:text-3xl text-xl font-semibold">We Offer Best Services</h1>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-2 mt-2">
            <CiSettings size={60} />
            <div className="flex flex-col items-center gap-1">
              <h2 className='text-[20px]'>Customizable Page</h2>
              <p className="text-center text-[14px]">
                Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 mt-2">
            <AiOutlinePicture size={60} />
            <div className="flex flex-col items-center gap-1">
              <h2 className='text-[20px]'>Revolution Slider</h2>
              <p className="text-center text-[14px]">
                Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 mt-2">
            <BsFillMenuButtonWideFill size={60} />
            <div className="flex flex-col items-center gap-1">
              <h2 className='text-[20px]'>Revolution Slider</h2>
              <p className="text-center text-[14px]">
                Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 mt-2">
            <AiOutlinePicture size={60} />
            <div className="flex flex-col items-center gap-1">
              <h2 className='text-[20px]'>Revolution Slider</h2>
              <p className="text-center text-[14px]">
                Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2" mt-2>
            <BsFillMenuButtonWideFill size={60} />
            <div className="flex flex-col items-center gap-1">
              <h2 className='text-[20px]'>Revolution Slider</h2>
              <p className="text-center text-[14px]">
                Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 mt-2">
            <CiSettings size={60} />
            <div className="flex flex-col items-center gap-1">
              <h2 className='text-[20px]'>Customizable Page</h2>
              <p className="text-center text-[14px]">
                Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
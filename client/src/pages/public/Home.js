import React from "react";
import { Banner, Sidebar } from "../../components";

const Home = () => {
  return (
    <div className="w-main grid grid-cols-10">
      <div className="flex flex-col gap-5 col-span-2 ">
        <Sidebar />
        <span>Deal Daily</span>
      </div>
      <div className="flex flex-col gap-5 pl-5 col-span-8 ">
        <Banner />
        <span>Best seller</span>
      </div>
    </div>
  );
};

export default Home;

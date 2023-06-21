import React from "react";
import { Banner, DealDaily, Sidebar } from "../../components";

import BestSeller from "../../components/BestSeller";

const Home = () => {
  return (
    <>
      <div className="w-main grid grid-cols-10">
        <div className="flex flex-col gap-5 col-span-3 ">
          <Sidebar />
          <DealDaily/>
        </div>
        <div className="flex flex-col gap-5 pl-5 col-span-7 ">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="w-full h-[500px]"></div>
    </>
  );
};

export default Home;

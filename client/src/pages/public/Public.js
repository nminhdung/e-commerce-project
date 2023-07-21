import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, TopHeader, Footer, Navigation } from "../../components";

const Public = () => {
  const [isNav, setNav] = useState(false);
  return (
    <div className="w-full  md:max-width-[1640px]">
      <TopHeader />
      <Header isNav={isNav} handleNav={setNav} />
      <Navigation isNav={isNav} handleNav={setNav} />
      <div className="w-full flex flex-col items-center ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;

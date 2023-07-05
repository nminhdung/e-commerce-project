import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, Navigation, TopHeader } from "../../components";

const Public = () => {
  const [isNav, setNav] = useState(false);
  return (
    <div className="w-full flex flex-col items-center">
      <TopHeader />
      <Header isNav={isNav} handleNav={setNav}/>
      <Navigation isNav={isNav} handleNav={setNav}/>
      <div className="w-full flex flex-col items-center ">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default Public;

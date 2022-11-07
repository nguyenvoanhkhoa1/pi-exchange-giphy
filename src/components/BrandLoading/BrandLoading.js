import React from "react";
import LogoImg from "../../assets/images/PI_logo.png";

const BrandLoading = () => {
  return (
    <div className="bg-white fixed top-0 left-0 w-screen h-screen">
      <img className="h-[52px] w-auto" src={LogoImg} alt="" />
    </div>
  );
};

export default BrandLoading;

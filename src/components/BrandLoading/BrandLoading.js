import React from "react";
import LogoImg from "../../assets/images/PI_logo.png";

const BrandLoading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
      <img className="h-[152px] w-auto" src={LogoImg} alt="" />
    </div>
  );
};

export default BrandLoading;

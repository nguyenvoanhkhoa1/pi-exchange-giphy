import React, { useState } from "react";

import SearchIcon from "../../../../assets/images/search-icon.svg";

const Topbar = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="container mx-auto px-4 sm:px-6 xl:px-0 xl:max-w-6xl">
      <div className="my-3 sticky rounded flex flex-wrap top-0 left-0 h-[52px] p-0 m-0 z-0 gap-3">
        <div className="grow border-0 h-[52px] z-[1] flex">
          <form className="bg-white flex grow relative items-center rounded overflow-hidden">
            {!keyword && (
              <div>
                <div className=" select-none overflow-hidden bg-white h-full left-0 z-0 top-0 text-[#a6a6a6] absolute w-full tracking-wide text-lg">
                  <div className=" translate-y-0 animate-[5s_ease_0s_infinite_normal_none_running]">
                    {/* <p className=" leading-[50px] mt-[1px] mr-0 mb-0 ml-[17px]">
                    @username + tag to search within a verified channel
                  </p> */}
                    <p className=" leading-[50px] mt-[1px] mr-0 mb-0 ml-[17px]">
                      Search all the GIFs and Stickers
                    </p>
                    {/* <p className=" leading-[50px] mt-[1px] mr-0 mb-0 ml-[17px]">
                    @username + tag to search within a verified channel
                  </p> */}
                  </div>
                </div>
              </div>
            )}
            <input
              type="text"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              className=" bg-[#fff] appearance-none rounded-none w-full border-0 m-0 z-[2] float-left relative h-[52px] tracking-wide text-lg p-[17px] focus-visible:outline-none"
              style={{ backgroundColor: "transparent" }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="hidden" />
          </form>
        </div>
        <div className="relative h-[52px] w-[52px] flex justify-center cursor-pointer">
          <div className="search-button"></div>
          <div className="z-[1] flex">
            <img className="w-[30px]" src={SearchIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

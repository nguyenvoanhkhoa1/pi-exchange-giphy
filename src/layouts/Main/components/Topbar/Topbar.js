import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";

import LogoImg from "../../../../assets/images/PI_logo.png";
import SearchIcon from "../../../../assets/images/search-icon.svg";
import { routeUrls } from "../../../../configs";
import { useSearchStore } from "../../../../stores";

const Topbar = () => {
  const [searchStore, updateSearchStore] = useSearchStore();
  const history = useHistory();
  const routeLocation = useLocation();

  const [keyword, setKeyword] = useState("");

  const handleChangeKeyWord = (e) => {
    setKeyword(e.target.value);
  };
  const goHome = () => {
    history.push(routeUrls.homepage.path);
  };
  const goSearch = () => {
    if (keyword !== "") {
      updateSearchStore((draft) => {
        draft.filter.q = keyword;
      });
      console.log(searchStore.filter);
      history.push(`/${routeUrls.search.path}/${keyword}`);
    }
    // document.getElementById("search-btn").click();
  };
  useEffect(() => {
    setKeyword(
      routeLocation.pathname.split("/")[1] === routeUrls.search.path
        ? routeLocation.pathname.split("/").at(-1)
        : ""
    );
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 xl:px-0 xl:max-w-6xl flex items-center gap-4">
      <button onClick={() => goHome()}>
        <img className="h-[52px] w-auto" src={LogoImg} alt="" />
      </button>
      <div className="my-3 sticky rounded flex flex-wrap top-0 left-0 h-[52px] w-full p-0 m-0 z-0 gap-3">
        <div className="grow border-0 h-[52px] z-[1] flex">
          <div className="bg-white flex grow relative items-center rounded overflow-hidden">
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
              onChange={(e) => handleChangeKeyWord(e)}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  // Cancel the default action, if needed
                  event.preventDefault();
                  // Trigger the button element with a click
                  goSearch();
                }
              }}
            />
            <button type="submit" className="hidden" />
          </div>
        </div>
        <button
          id="search-btn"
          // to={keyword !== "" ? `/${routeUrls.search.path}/${keyword}` : "#"}
          className="relative h-[52px] w-[52px] flex justify-center items-center cursor-pointer"
          onClick={() => goSearch()}
        >
          <div className="search-button"></div>
          <div className="z-[1] flex">
            <img className="w-[30px]" src={SearchIcon} alt="" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Topbar;

import httpStatus from "http-status";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";

import LogoImg from "../../../../assets/images/PI_logo.png";
import SearchIcon from "../../../../assets/images/search-icon.svg";
import { routeUrls, SEARCH } from "../../../../configs";
import { getSearchAutocomplete } from "../../../../services/gif/gif.service";
import { useSearchStore } from "../../../../stores";

const Topbar = () => {
  const [searchStore, updateSearchStore] = useSearchStore();
  const history = useHistory();
  const routeLocation = useLocation();

  const [keyword, setKeyword] = useState("");
  const [autoComplete, setAutocomplete] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const handleChangeKeyWord = (e) => {
    setKeyword(e.target.value);
  };
  const goHome = () => {
    history.push(routeUrls.homepage.path);
  };
  const goSearch = (tag = keyword) => {
    if (tag !== "") {
      updateSearchStore((draft) => {
        draft.filter.q = tag;
      });
      setKeyword(tag);
      history.push(`/${routeUrls.search.path}/${tag}`);
    }
  };

  const createBody = () => {
    let body = {};
    body = {
      api_key: process.env.REACT_APP_API_KEY,
      q: keyword,
      limit: SEARCH.autocomplete.defaultLimit,
    };
    return body;
  };

  const fetchAutocomplete = async () => {
    let body = createBody();
    const res = await getSearchAutocomplete(body);
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const { data } = res;
          setAutocomplete(data.data);
          console.log(data);
          break;
        }
        case httpStatus.NOT_FOUND: {
          break;
        }
        default:
          break;
      }
    }
    return null;
  };

  useEffect(() => {
    fetchAutocomplete();
  }, [keyword]);

  useEffect(() => {
    setKeyword(
      routeLocation.pathname.split("/")[1] === routeUrls.search.path
        ? routeLocation.pathname.split("/").at(-1)
        : ""
    );
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 xl:px-0 lg:max-w-5xl flex items-center gap-4 z-10">
      <button onClick={() => goHome()}>
        <img className="h-[52px] w-auto" src={LogoImg} alt="" />
      </button>
      <div className="my-3 sticky rounded flex flex-wrap top-0 left-0 h-[52px] w-full p-0 m-0 z-0 gap-3">
        <div className="grow border-0 h-[52px] z-[1] flex relative">
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
              className=" bg-[#fff] appearance-none rounded-none w-full border-0 m-0 z-[2] float-left relative h-[52px] tracking-wide text-lg p-[17px] pr-10 focus-visible:outline-none"
              style={{ backgroundColor: "transparent" }}
              value={keyword}
              onChange={(e) => handleChangeKeyWord(e)}
              onFocus={() => setShowAutocomplete(true)}
              onBlur={() =>
                setTimeout(() => {
                  setShowAutocomplete(false);
                }, 500)
              }
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  // Cancel the default action, if needed
                  event.preventDefault();
                  // Trigger the button element with a click
                  goSearch();
                }
              }}
            />
            <span
              className="absolute top-1/2 right-4 -translate-y-1/2 z-[3] cursor-pointer"
              onClick={() => setKeyword("")}
            >
              <i class="fa-solid fa-xmark"></i>
            </span>
            <button type="submit" className="hidden" />
          </div>
          {!!showAutocomplete && (
            <div className="absolute top-[53px] left-0 right-0 z-20">
              {autoComplete.map((item, index) => (
                <div
                  className="bg-white h-14 cursor-pointer flex items-center p-4 hover:bg-slate-200"
                  onClick={() => goSearch(item?.name)}
                >
                  {item?.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          id="search-btn"
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

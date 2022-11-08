import httpStatus from "http-status";
import React, { useEffect, useRef, useState } from "react";
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

  const [onTopScreen, setOnTopScreen] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [autoComplete, setAutocomplete] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const typingTimeoutRef = useRef(null);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setOnTopScreen(false);
    } else if (scrolled <= 300) {
      setOnTopScreen(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

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
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      if (keyword === "") setKeyword([]);
      else fetchAutocomplete();
    }, SEARCH.autocomplete.defaultTimeout);
  }, [keyword]);

  useEffect(() => {
    setKeyword(
      routeLocation.pathname.split("/")[1] === routeUrls.search.path
        ? routeLocation.pathname.split("/").at(-1)
        : ""
    );
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 xl:px-0 lg:max-w-5xl flex items-center gap-4 z-10">
        <button onClick={() => goHome()}>
          <img className="h-[52px] w-auto" src={LogoImg} alt="" />
        </button>
        <div className="my-3 sticky rounded flex flex-wrap top-0 left-0 h-[52px] w-full p-0 m-0 z-0 gap-3">
          <div className="grow border-0 h-[52px] z-[1] flex relative flex-col">
            <div className="bg-white flex grow relative items-center rounded overflow-hidden shrink-0">
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
                  }, 300)
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
              <div className="mt-[2px] h-0">
                <div className="rounded z-20 bg-white overflow-hidden grid grid-cols-4">
                  {autoComplete.map((item, index) => (
                    <div
                      className=" h-12 cursor-pointer flex items-center p-4 hover:bg-slate-200 border-dashed border-[1px]"
                      onClick={() => goSearch(item?.name)}
                    >
                      {item?.name}
                    </div>
                  ))}
                </div>
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
      <button
        className={`${
          onTopScreen ? "fixed -bottom-14" : "fixed bottom-5"
        } right-5 w-14 h-14 bg-transparent rounded-full border-2 border-[#e41147] text-[#e41147] hover:bg-white transition-all duration-500 flex items-center justify-center z-10`}
        onClick={() => scrollToTop()}
      >
        <i class="fa-solid fa-arrow-up"></i>
      </button>
    </>
  );
};

export default Topbar;

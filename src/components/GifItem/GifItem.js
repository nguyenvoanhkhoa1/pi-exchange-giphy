import clsx from "clsx";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { routeUrls } from "../../configs";

const GifItem = (props) => {
  const { className, item, ...rest } = props;
  const [favorite, setFavorite] = useState(false);

  const copyToClipboard = (text) => {
    // Copy the text inside the text field
    navigator.clipboard.writeText(text);
    // Alert the copied text
    alert("Link copied to clipboard!");
  };

  return (
    <div
      key={item?.id}
      className={clsx(className, "bg-slate-500 rounded mb-3")}
    >
      <div className="w-full h-full relative group">
        <NavLink to={`/${routeUrls.gifs.path}/${item?.slug}`}>
          <img
            className="w-full h-full rounded object-cover"
            src={item?.images?.downsized?.url}
            alt=""
          />
        </NavLink>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in">
          <div className=" absolute top-1 left-0 right-3 flex justify-end items-center gap-3">
            <span
              className=" text-white cursor-pointer hover:scale-110 transition-transform duration-150"
              onClick={() => copyToClipboard(item?.images?.original?.url)}
            >
              <i className="fa-solid fa-link" />
            </span>
            <span
              className=" text-white cursor-pointer hover:scale-110 transition-transform duration-150"
              onClick={() => setFavorite(!favorite)}
            >
              <i
                className="fa-solid fa-heart"
                style={favorite ? { color: "#e41147" } : {}}
              ></i>
            </span>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0000] to-[#12121299] cursor-default"></div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
            {!!item?.user && (
              <>
                <img
                  className=" w-10 h-10 shrink-0 object-cover"
                  src={item?.user?.avatar_url}
                  alt=""
                />
                <div className=" text-white text-base font-bold overflow-hidden text-ellipsis whitespace-nowrap antialiased">
                  {item?.user?.display_name}
                </div>
              </>
            )}
            {!!item?.user?.is_verified && (
              <svg height="14" width="19px" viewBox="0 0 19 17">
                <path
                  d="M9.32727273,9.44126709 L9.32727273,3.03016561 L6.55027155,3.03016561 L6.55027155,10.8150746 L6.55027155,12.188882 L12.1042739,12.188882 L12.1042739,9.44126709 L9.32727273,9.44126709 Z"
                  fill="#121212"
                  transform="translate(9.327273, 7.609524) scale(-1, 1) rotate(-45.000000) translate(-9.327273, -7.609524) "
                ></path>
                <g
                  transform="translate(-532.000000, -466.000000)"
                  fill="#15CDFF"
                >
                  <g transform="translate(141.000000, 235.000000)">
                    <g transform="translate(264.000000, 0.000000)">
                      <g transform="translate(10.000000, 224.000000)">
                        <g transform="translate(114.000000, 2.500000)">
                          <path d="M15.112432,4.80769231 L16.8814194,6.87556817 L19.4157673,7.90116318 L19.6184416,10.6028916 L21.0594951,12.9065042 L19.6184416,15.2101168 L19.4157673,17.9118452 L16.8814194,18.9374402 L15.112432,21.0053161 L12.4528245,20.3611511 L9.79321699,21.0053161 L8.02422954,18.9374402 L5.48988167,17.9118452 L5.28720734,15.2101168 L3.84615385,12.9065042 L5.28720734,10.6028916 L5.48988167,7.90116318 L8.02422954,6.87556817 L9.79321699,4.80769231 L12.4528245,5.4518573 L15.112432,4.80769231 Z M17.8163503,10.8991009 L15.9282384,9.01098901 L11.5681538,13.3696923 L9.68115218,11.4818515 L7.81302031,13.3499833 L9.7011322,15.2380952 L11.5892441,17.1262071 L17.8163503,10.8991009 Z"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifItem;

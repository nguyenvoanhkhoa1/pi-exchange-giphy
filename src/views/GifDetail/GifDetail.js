import httpStatus from "http-status";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import { getGifById } from "../../services/gif/gif.service";
import FacebookIcon from "../../assets/images/facebook.png";
import InstagramIcon from "../../assets/images/instagram.png";
import TumblrIcon from "../../assets/images/tumblr.png";
import TwitterIcon from "../../assets/images/twitter.png";
import YoutubeIcon from "../../assets/images/youtube.png";
import { routeUrls } from "../../configs";

const GifDetail = () => {
  const routeLocation = useLocation();
  const history = useHistory();
  const id = routeLocation.pathname.split("/").at(-1).split("-").at(-1);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const createBody = () => {
    let body = {};
    body = {
      api_key: process.env.REACT_APP_API_KEY,
      gif_id: id,
      random_id: "",
    };
    return body;
  };

  function convertDate(date) {
    const defaultDate = "0001-01-01T00:00:00";
    let newDate;
    if (date && date !== defaultDate) {
      newDate = moment(date).format("DD/MM/YYYY");
    }
    return newDate;
  }

  const fetchGifDetail = async () => {
    if (isLoading) return null;
    setIsLoading(true);
    let body = createBody();
    const res = await getGifById(id, body);
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const { data } = res;
          setData(data.data);
          break;
        }
        case httpStatus.NOT_FOUND: {
          console.log(res.status);
          history.push(routeUrls.homepage.path);
          break;
        }
        default:
          break;
      }
    }
    setIsLoading(false);
    return null;
  };

  useEffect(() => {
    fetchGifDetail();
    return () => {
      setData({});
    };
  }, [id]);

  return (
    <div className="pt-4 pb-10 grid grid-cols-12 gap-6">
      {console.log(data)}
      <div className="col-span-3">
        {data?.user && (
          <div className=" py-6">
            <div className="flex items-center gap-3">
              <img
                className="w-[50px] h-[50px] object-cover shrink-0"
                src={data?.user?.avatar_url}
                alt=""
              />
              <div className="flex flex-col">
                <div className="font-black text-white">
                  {data?.user?.display_name}
                </div>
                <div className="flex items-center whitespace-nowrap text-ellipsis overflow-hidden text-sm font-bold text-[#a6a6a6] gap-1">
                  @{data?.user?.username}
                  {!!data?.user?.is_verified && (
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
            <div className="mt-5 mb-1 whitespace-pre-wrap text-[#a6a6a6] text-sm break-words">
              {data?.user?.description}
            </div>
            <div className="mt-8 flex flex-col">
              <p className="text-[#a6a6a6] font-semibold text-sm mb-3">
                Follow on:
              </p>
              <div className="flex gap-2 mb-2">
                {!!data?.user?.facebook_url && (
                  <a
                    href={data?.user?.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="w-8 h-8 shrink-0"
                      src={FacebookIcon}
                      alt=""
                    />
                  </a>
                )}
                {!!data?.user?.instagram_url && (
                  <a
                    href={data?.user?.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="w-8 h-8 shrink-0"
                      src={InstagramIcon}
                      alt=""
                    />
                  </a>
                )}
                {!!data?.user?.tumblr_url && (
                  <a
                    href={data?.user?.tumblr_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img className="w-8 h-8 shrink-0" src={TumblrIcon} alt="" />
                  </a>
                )}
                {!!data?.user?.twitter_url && (
                  <a
                    href={data?.user?.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="w-8 h-8 shrink-0"
                      src={TwitterIcon}
                      alt=""
                    />
                  </a>
                )}
                {!!data?.user?.youtube_url && (
                  <a
                    href={data?.user?.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="w-8 h-8 shrink-0"
                      src={YoutubeIcon}
                      alt=""
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
        <div className=" break-words py-6 flex flex-col">
          <span className="mb-2 text-[#a6a6a6] tracking-wide text-sm capitalize font-semibold">
            Source
          </span>
          <a
            className="flex items-center text-sm font-semibold text-white"
            href={data?.source || data?.user?.website_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-regular fa-share-from-square mr-2"></i>
            <span className=" limitLine1 whitespace-nowrap">
              {data?.source || data?.user?.website_url}
            </span>
          </a>
        </div>
      </div>
      <div className="pt-6 relative col-span-6 flex flex-col">
        <div className="relative z-[2] h-7 flex-grow-0 text-ellipsis whitespace-nowrap">
          <span className="text-[#a6a6a6] text-sm tracking-wide capitalize antialiased font-semibold">
            {data?.title}
            <button onClick={() => setShowDetail(!showDetail)}>
              {showDetail ? (
                <i class="fa-solid fa-xmark ml-3"></i>
              ) : (
                <i class="fa-solid fa-ellipsis ml-3"></i>
              )}
            </button>
          </span>
        </div>
        <div className="relative group">
          {!!showDetail && (
            <div className="absolute top-[6px] left-[6px] right-[6px] bg-[#000000e6] p-4 overflow-hidden grid grid-cols-2 text-white gap-y-[6px]">
              <div>
                Source: {data?.images?.original?.width}x
                {data?.images?.original?.height} px
              </div>
              <div>Uploaded: {convertDate(data?.import_datetime)}</div>
              <div>Size: {data?.images?.original?.size} KB</div>
              <div>
                Rating: <span className=" uppercase">{data?.rating}</span>
              </div>
              <div>Frames: {data?.images?.original?.frames}</div>
            </div>
          )}
          <img
            className="w-full h-auto object-cover shrink-0"
            src={data?.images?.original?.url}
            alt=""
          />
          <div className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 p-[10px] translate-y-4 group-hover:translate-y-0 transition-[opacity_.2s_ease-out,_transform_.2s_ease-out]">
            <button className="h-9 w-9 shrink-0 flex items-center justify-center bg-[#000c] text-white">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-3 pt-12 flex flex-col gap-3">
        <div
          className="group p-3 rounded cursor-pointer flex items-center h-11 font-bold text-white text-lg gap-4 hover:bg-slate-900"
          onClick={() => setFavorite(!favorite)}
        >
          <i
            className="fa-solid fa-heart group-hover:scale-110 transition-transform duration-150"
            style={favorite ? { color: "#e41147" } : {}}
          ></i>
          Favorite
        </div>
        <div className="group p-3 rounded cursor-pointer flex items-center h-11 font-bold text-white text-lg gap-4 hover:bg-slate-900">
          <i className="fa-solid fa-paper-plane group-hover:scale-110 transition-transform duration-150"></i>
          Share
        </div>
        <div className="group p-3 rounded cursor-pointer flex items-center h-11 font-bold text-white text-lg gap-4 hover:bg-slate-900">
          <i className="fa-solid fa-code group-hover:scale-110 transition-transform duration-150"></i>
          Embed
        </div>
      </div>
    </div>
  );
};

export default GifDetail;

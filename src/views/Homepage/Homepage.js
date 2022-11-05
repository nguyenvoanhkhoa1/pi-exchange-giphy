import httpStatus from "http-status";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getTrendingGif } from "../../services/gif/gif.service";
import { useAppStore, useTrendingStore } from "../../stores";
import clsx from "clsx";

const Homepage = () => {
  const [appStore, updateAppStore] = useAppStore();
  const [trendingStore, updateTrendingStore] = useTrendingStore();

  const routeLocation = useLocation();
  const history = useHistory();

  const [trendingGif, setTrendingGif] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrendingGif = async () => {
    // updateTrendingStore((draft) => {
    // });
    if (isLoading) return null;
    setIsLoading(true);
    const res = await getTrendingGif(trendingStore.filter);
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const { data } = res;
          console.log(data);
          setTrendingGif(data.data);
          break;
        }
        case httpStatus.NOT_FOUND: {
          break;
        }
        default:
          break;
      }
    }
    // updateTrendingStore(draft => {
    // });
    setIsLoading(false);
    return null;
  };

  useEffect(() => {
    fetchTrendingGif();
    return () => {
      setData([]);
    };
  }, []);

  return (
    <div
      className={clsx(
        "container mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 xxl:columns-6 gap-3"
      )}
    >
      {console.log(trendingGif[0])}
      {!!trendingGif &&
        trendingGif.map((item, index) => (
          <div className="relative my-3">
            <img
              className="w-full h-auto rounded"
              src={item?.images?.downsized?.url}
              alt=""
              key={item?.id}
            />
          </div>
        ))}
    </div>
  );
};

export default Homepage;

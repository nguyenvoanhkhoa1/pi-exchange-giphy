import httpStatus from "http-status";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getTrendingGif } from "../../services/gif/gif.service";
import { useAppStore, useTrendingStore } from "../../stores";
import clsx from "clsx";
import { GiphyItem } from "../../components";

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
        "container mx-auto px-4 sm:px-6 xl:px-0 xl:max-w-6xl columns-2 lg:columns-3 xl:columns-4 xxl:columns-5 gap-3"
      )}
    >
      {console.log(trendingGif[5])}
      {!!trendingGif &&
        trendingGif.map((item, index) => <GiphyItem item={item} />)}
    </div>
  );
};

export default Homepage;

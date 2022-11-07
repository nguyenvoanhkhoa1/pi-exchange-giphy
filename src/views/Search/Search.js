import httpStatus from "http-status";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getSearchResultGif } from "../../services/gif/gif.service";
import { useAppStore, useSearchStore } from "../../stores";
import { GifMasonry } from "../../components";

const Search = () => {
  const [appStore, updateAppStore] = useAppStore();
  const [searchStore, updateSearchStore] = useSearchStore();

  const routeLocation = useLocation();
  const history = useHistory();

  const keyword =
    routeLocation.pathname.split("/").at(-1) || searchStore.filter.q;
  const [resultGif, setResultGif] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchResultGif = async () => {
    console.log("fetch");
    if (isLoading) return null;
    setIsLoading(true);
    const res = await getSearchResultGif({ ...searchStore.filter, q: keyword });
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const { data } = res;
          setResultGif(data?.data);
          console.log(data?.pagination?.total_count);
          setTotalCount(data?.pagination?.total_count);
          break;
        }
        case httpStatus.NOT_FOUND: {
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
    fetchResultGif();
    return () => {
      setResultGif([]);
    };
  }, []);

  return (
    <div>
      <>
        <div className="flex mt-8 mb-3 items-end text-3xl font-bold text-white gap-4">
          {keyword}{" "}
          <span className="mb-1 text-[#a6a6a6] text-sm whitespace-pre font-bold pl-1">
            {totalCount} GIFs
          </span>
        </div>
        <GifMasonry items={resultGif} />
      </>
    </div>
  );
};

export default Search;

import httpStatus from "http-status";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getSearchResultGif } from "../../services/gif/gif.service";
import { useAppStore, useSearchStore } from "../../stores";
import { GifMasonry, Loading } from "../../components";
import { TABLE } from "../../configs";

const Search = () => {
  const [searchStore, updateSearchStore] = useSearchStore();

  const routeLocation = useLocation();

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
          setResultGif((pre) => [...pre, ...data.data]);
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
  }, [keyword, searchStore.filter.offset]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        let newOffset = searchStore.filter.offset + TABLE.defaultLimit;
        updateSearchStore((draft) => {
          draft.filter.offset = newOffset;
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [searchStore.filter.offset]);

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
        <Loading />
      </>
    </div>
  );
};

export default Search;

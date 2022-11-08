import React from "react";
import Masonry from "react-masonry-css";
import clsx from "clsx";
import { GifItem } from "../../components";

const GifMasonry = (props) => {
  const { items } = props;

  const breakpointColumnsObj = {
    default: 4,
    1919: 5,
    1535: 4,
    1279: 3,
    1023: 2,
  };

  return (
    <div className=" z-0">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {!!items?.length &&
          items?.map((item, index) => <GifItem item={item} />)}
      </Masonry>
      {/* <div className="columns-2 lg:columns-3 xl:columns-4 xxl:columns-5 gap-3">
        {!!items && items.map((item, index) => <GifItem item={item} />)}
      </div> */}
      {/* <div className="mb-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-3">
        {!!items && items.map((item, index) => <GifItem item={item} />)}
      </div> */}
    </div>
  );
};

export default GifMasonry;

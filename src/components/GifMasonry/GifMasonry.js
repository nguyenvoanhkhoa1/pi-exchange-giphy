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
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {!!items && items.map((item, index) => <GifItem item={item} />)}
    </Masonry>
  );
};

export default GifMasonry;

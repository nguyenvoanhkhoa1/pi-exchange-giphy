import React from "react";
import clsx from "clsx";
import { GifItem } from "../../components";

const GifMasonry = (props) => {
  const { items } = props;
  return (
    <div className="columns-2 lg:columns-3 xl:columns-4 xxl:columns-5 gap-3">
      {console.log(items[5])}
      {!!items && items.map((item, index) => <GifItem item={item} />)}
    </div>
  );
};

export default GifMasonry;

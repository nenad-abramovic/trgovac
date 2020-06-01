import React from "react";

const SortResults = ({ ads, sortAds }) => {
  const handleChange = (e) => {
    let value = e.target.value;
    let tmp = [...ads.filtered];
    if (value === "num_price") {
      tmp = tmp.map((x) => ({
        ...x,
        num_price: parseInt(x.price.replace(/\$|,/g, "")),
      }));
    }
    tmp.sort((a, b) => {
      return a[value] > b[value] ? 1 : a[value] < b[value] ? -1 : 0;
    });
    sortAds({ all: ads.all, filtered: tmp, success: true });
  };

  const reverseAds = () => {
    sortAds({ all: ads.all, filtered: ads.filtered.reverse(), success: true });
  };

  return (
    <div>
      <span>сортирај према</span>
      <select onChange={handleChange}>
        <option value="created_at">датум објављивања</option>
        <option value="num_price">цена</option>
      </select>
      <button onClick={reverseAds}>
        <b>&#x21C5;</b>
      </button>
    </div>
  );
};

export default SortResults;

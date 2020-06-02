import React from "react";
import styles from "./SortResults.module.css";

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
    <div className={styles.container}>
      <div>
        <p>сортирај према</p>
        <select onChange={handleChange}>
          <option value="created_at">датум објављивања</option>
          <option value="num_price">цена</option>
        </select>
      </div>
      <button onClick={reverseAds}>
        <b>&#x21C5;</b>
      </button>
    </div>
  );
};

export default SortResults;
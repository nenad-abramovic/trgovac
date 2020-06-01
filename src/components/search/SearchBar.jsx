import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ ads, filterAds }) => {
  const handleChange = (e) => {
    let tmp = ads.filter((ad) =>
      ad.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    filterAds({ all: ads, filtered: tmp, success: true });
  };

  return (
    <div className={styles.container}>
      <input type="search" placeholder="тражи..." onChange={handleChange} />
    </div>
  );
};

export default SearchBar;

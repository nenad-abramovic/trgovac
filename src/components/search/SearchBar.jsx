import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ ads, filterAds }) => {
  const handleChange = (e) => {
    let regex = new RegExp(e.target.value, 'gi')
    let tmp = ads.filter(ad => regex.test(ad.title));
    filterAds({ all: ads, filtered: tmp });
  }
  return (
    <div>
      <input type="search" className={styles.search} placeholder="Тражи..." onChange={handleChange} />
    </div>
  );
};

export default SearchBar;
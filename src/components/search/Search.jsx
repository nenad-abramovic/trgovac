import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { getAds } from '../../utilities/services';
import SearchCriteria from './SearchCriteria';

const Search = () => {
  const [ads, setAds] = useState({all:[], filtered: []});
  useEffect(() => {
    getAds()
    .then(data => {
      if(data.success) {
      setAds({ all: data.data, filtered: data.data });
      }
    });
  }, []);

  return (
    <>
      <SearchBar ads={ads.all} filterAds={setAds} />
      <SearchCriteria ads={ads.all} filterAds={setAds} />
      <SearchResults ads={ads.filtered} />
    </>
  );
};

export default Search;
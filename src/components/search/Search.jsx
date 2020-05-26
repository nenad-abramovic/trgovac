import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { getAds } from '../../utilities/services';
import SearchCriteria from './SearchCriteria';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const [ads, setAds] = useState({all:[], filtered: []});
  useEffect(() => {
    if(location.state) {
      getAds(location.state.category)
    .then(data => {
      if(data.success) {
      setAds({ all: data.data, filtered: data.data });
      }
    });
    }
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
      <SearchCriteria filterAds={setAds} />
      <SearchResults ads={ads.filtered} />
    </>
  );
};

export default Search;
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { getAds } from "../../utilities/services";
import SearchCriteria from "./SearchCriteria";
import usePlaces from "../../utilities/places";
import useCategories from "../../utilities/categories";
import SortResults from "./SortResults";

const Search = () => {
  const [ads, setAds] = useState({ all: [], filtered: [], success: false });
  const [places, setPlaces] = usePlaces();
  const [categories, setCategories] = useCategories();

  useEffect(() => {
    getAds(categories.currentCategory, places.currentPlace)
      .then((data) => {
        if (data.success) {
          setAds({ all: data.data, filtered: data.data, success: true });
        } else {
          setAds((prevState) => ({ ...prevState, success: false }));
        }
      })
      .catch(() => setAds((prevState) => ({ ...prevState, success: false })));
  }, []);

  if (ads.success)
    return (
      <div>
        <SearchBar ads={ads.all} filterAds={setAds} />
        <SearchCriteria filterAds={setAds} />
        <SortResults ads={ads} sortAds={setAds} />
        <SearchResults ads={ads.filtered} />
      </div>
    );

  return (
    <div>
      <p>Сачекајте...</p>
    </div>
  );
};

export default Search;

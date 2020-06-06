import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { getAds } from "../../utilities/services";
import SearchCriteriaa from "./SearchCriteria";
import usePlaces from "../../utilities/places";
import {
  categories,
  changeCategory,
  subscribe,
  unsubscribe,
} from "../../utilities/categories";
import SortResults from "./SortResults";

const Search = () => {
  const [ads, setAds] = useState({
    all: [],
    filtered: [],
    success: false,
    errorMessage: "",
  });
  const [currentCategory, setCurrentCategory] = useState(
    categories.currentValue
  );
  const [places, setPlaces] = usePlaces();

  useEffect(() => {
    let f = () => setCurrentCategory(categories.currentValue);
    subscribe(f);
    return unsubscribe(f);
  }, []);

  useEffect(() => {
    console.log(categories.currentValue);
    getAds(categories.currentValue, places.currentValue)
      .then((data) =>
        setAds({ all: data, filtered: data, success: true, errorMessage: "" })
      )
      .catch((e) =>
        setAds((prevState) => ({
          ...prevState,
          success: false,
          errorMessage: e.message,
        }))
      );
  }, [currentCategory, places.currentValue]);

  if (ads.success)
    return (
      <div>
        <SearchBar ads={ads.all} filterAds={setAds} />
        <SearchCriteriaa
          data={categories}
          label="категорије"
          setCurrentValue={changeCategory}
          defaultValue="све"
        />
        <SearchCriteriaa
          data={places}
          label="места"
          setCurrentValue={setPlaces}
          defaultValue="сва места"
        />
        <SortResults ads={ads} sortAds={setAds} />
        <SearchResults ads={ads.filtered} />
      </div>
    );

  return (
    <div>
      <p>{ads.errorMessage || "Сачекајте..."}</p>
    </div>
  );
};

export default Search;

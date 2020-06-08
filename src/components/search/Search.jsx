import React, { useEffect, useState, useContext } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { getAds } from "../../utilities/services";
import SearchCriteriaa from "./SearchCriteria";
import usePlaces from "../../utilities/places";
import CategoryContext from "../../utilities/categories";
import SortResults from "./SortResults";
import styles from "./Search.module.css";

const Search = () => {
  const { categories, setCategories } = useContext(CategoryContext);
  const [ads, setAds] = useState({
    all: [],
    filtered: [],
    success: false,
    errorMessage: "",
  });
  const [places, setPlaces] = usePlaces();

  useEffect(() => {
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
  }, [categories.currentValue, places.currentValue]);

  if (ads.success)
    return (
      <div>
        <SearchBar ads={ads.all} filterAds={setAds} />
        <SearchCriteriaa
          data={categories}
          label="категорије"
          setCurrentValue={setCategories}
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
    <div className={styles.infoMsg}>
      <p>{ads.errorMessage || "Сачекајте..."}</p>
    </div>
  );
};

export default Search;

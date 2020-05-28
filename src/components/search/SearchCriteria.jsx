import React, { useState } from "react";
import usePlaces from "../../utilities/places";
import useCategories from "../../utilities/categories";
import styles from "./SearchCriteria.module.css";
import { getAds } from "../../utilities/services";

const SearchCriteria = ({ filterAds }) => {
  const places = usePlaces();
  const categories = useCategories();
  const [criteria, setCriteria] = useState({ category: "%", place: "%" });

  const selectCriteria = (e) => {
    let tmp = { ...criteria };
    tmp[e.target.id] = e.target.value;
    setCriteria(tmp);
    try {
      getAds(tmp.category, tmp.place).then((data) => {
        if (data.success) {
          console.log(data);
          filterAds({ all: data.data, filtered: data.data, success: true });
        } else {
          filterAds((prevState) => ({ ...prevState, success: false }));
        }
      });
    } catch (e) {
      filterAds((prevState) => ({ ...prevState, success: false }));
    }
  };

  return (
    <div className={styles.container}>
      <div>
        {categories.success ? (
          <select id="category" onChange={selectCriteria}>
            <option value="%">изабери категорију</option>
            {categories.data.map((category) => (
              <option key={category.category_uuid} value={category.name}>
                {category.name.toLowerCase()}
              </option>
            ))}
          </select>
        ) : (
          <p>{categories.message}</p>
        )}
      </div>
      <div>
        {places.success ? (
          <select id="place" onChange={selectCriteria}>
            <option value="%">изабери место</option>
            {places.data.map((place) => (
              <option key={place.place_uuid} value={place.name}>
                {place.name.toLowerCase()}
              </option>
            ))}
          </select>
        ) : (
          <p>{places.message}</p>
        )}
      </div>
    </div>
  );
};

export default SearchCriteria;

import React, { useState } from 'react';
import usePlaces from '../../utilities/places';
import useCategories from '../../utilities/categories';
import styles from './SearchCriteria.module.css';
import { getAds } from '../../utilities/services';

const SearchCriteria = ({ ads, filterAds }) => {
  const places = usePlaces();
  const categories = useCategories();
  const [criteria, setCriteria] = useState({ category: '%', place: '%' });

  const selectCriteria = (e) => {
    let tmp = { ...criteria };
    tmp[e.target.id] = e.target.value;
    setCriteria(tmp);
    getAds(criteria.category, criteria.place)
      .then(data => {
        if(data.success){
          console.log(data);
          filterAds({ all: ads, filtered: data.data });
        }
      })
  }

  return (
    <div className={styles.container}>
      <div>
      <select id="category" onChange={selectCriteria}>
        <option value="%">изабери категорију</option>
        {
          categories.map(category => (
            <option key={category.category_uuid} value={category.category_uuid}>{category.name.toLowerCase()}</option>
          ))
        }
      </select>
      </div>
      <div>
      <select id="place" onChange={selectCriteria}>
        <option value="%">изабери место</option>
      {
          places.map(place => (
            <option key={place.place_uuid} value={place.place_uuid}>{place.name.toLowerCase()}</option>
          ))
        }
      </select>
      </div>
    </div>
  );
};

export default SearchCriteria;
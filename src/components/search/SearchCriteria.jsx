import React, { useState } from 'react';
import usePlaces from '../../utilities/places';
import useCategories from '../../utilities/categories';
import { useHistory } from 'react-router-dom';
import styles from './SearchCriteria.module.css';

const SearchCriteria = () => {
  const places = usePlaces();
  const categories = useCategories();
  const history = useHistory();
  const [criteria, setCriteria] = useState({category: '%', place: '%'}); 

  const selectCategory = (e) => {
    setCriteria()
    history.push({
      pathname: '/', 
      state: {
        category: e.target.value, 
        place: criteria.place 
      }
    });
  }
  const selectPlace = (e) => {
    history.push({
      pathname: '/', 
      state: {
        category: criteria.category, 
        place: e.target.value 
      }
    });
  }

  return (
    <div className={styles.container}>
      <div>
      <select id="category" onChange={selectCategory}>
        <option value="%">изабери категорију</option>
        {
          categories.map(category => (
            <option key={category.category_uuid} value={category.category_uuid}>{category.name.toLowerCase()}</option>
          ))
        }
      </select>
      </div>
      <div>
      <select id="place" onChange={selectPlace}>
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
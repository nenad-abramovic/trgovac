import React, { useState } from 'react';
import usePlaces from '../../utilities/places';
import useCategories from '../../utilities/categories';
import { useHistory } from 'react-router-dom';

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
        place: e.target.value 
      }
    });
  }
  const selectPlace = (e) => {
    history.push({
      pathname: '/', 
      state: {
        category: e.target.value, 
        place: e.target.value 
      }
    });
  }

  return (
    <div>
      <label htmlFor="category">Категорија</label>
      <select id="category" onChange={selectCategory}>
        <option value="%">Изабери категорију</option>
        {
          categories.map(category => (
            <option key={category.category_uuid} value={category.category_uuid}>{category.name}</option>
          ))
        }
      </select>
      <label htmlFor="place">Место</label>
      <select id="place" onChange={selectPlace}>
        <option value="%">Изабери место</option>
      {
          places.map(place => (
            <option key={place.place_uuid} value={place.place_uuid}>{place.name}</option>
          ))
        }
      </select>
    </div>
  );
};

export default SearchCriteria;
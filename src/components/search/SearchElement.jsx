import React from 'react';
import styles from './SearchElement.module.css';

const SearchElement = ({ ad }) => {
  return (
    <div className={styles.container}>
      <div>
        <h4 className={styles.title}>{ad.title} - {ad.price}</h4>
        <p>{ad.place} - {ad.created_at} - {ad.fullname} - {ad.phone_number}</p>
        <p>{ad.description}</p>
      </div>
      <img style={{ width: '200px', height: '200px' }} src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(ad.image.data)))}`} alt={`Слика за ${ad.title}`} />
    </div>
  );
}

export default SearchElement;
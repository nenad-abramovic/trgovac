import React from 'react';
import styles from './SearchElement.module.css';
import { Link } from 'react-router-dom';

const SearchElement = ({ ad }) => {
  return (
    <div className={styles.container}>
      <div>
        <Link to={`/ad/${ad.ad_uuid}`}><h4 className={styles.title}>{ad.title}</h4></Link>
  <p>цена: {ad.price}</p>
        <p>{ad.place} - {ad.created_at} - {ad.fullname} - {ad.phone_number}</p>
      </div>
      <img style={{ width: '200px', height: '200px' }} src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(ad.image.data)))}`} alt={`Слика за ${ad.title}`} />
    </div>
  );
}

export default SearchElement;
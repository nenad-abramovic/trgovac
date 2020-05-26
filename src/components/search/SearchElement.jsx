import React from 'react';
import styles from './SearchElement.module.css';
import { Link } from 'react-router-dom';

const SearchElement = ({ ad }) => {
  return (
    <div className={styles.container}>
      <div>
        <Link to={`/ad/${ad.ad_uuid}`}><h3 className={styles.title}>{ad.title}</h3></Link>
        <p>цена: {ad.price}</p>
        <p>датум објављивања: {new Date(ad.created_at).toLocaleString("sr-Cyrl")}</p>
        <p>продавац: {ad.fullname}</p>
        <p>број телефона: {ad.phone_number}</p>
      </div>
      <img src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(ad.image.data)))}`} alt={`Слика за ${ad.title}`} />
    </div>
  );
}

export default SearchElement;
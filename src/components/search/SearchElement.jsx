import React, { useEffect } from "react";
import styles from "./SearchElement.module.css";
import { Link } from "react-router-dom";
import noImage from "../../assets/images/no_image.jpeg";

const SearchElement = ({ ad }) => {
  useEffect(() => {
    console.log(ad);
  }, []);
  return (
    <div className={styles.container}>
      <div>
        <h3>
          <Link to={{ pathname: `/ad/${ad.ad_uuid}`, state: { ad } }}>
            {ad.title}
          </Link>
        </h3>
        <p>цена: {ad.price}</p>
        <p>
          датум објављивања: {new Date(ad.created_at).toLocaleString("sr-Cyrl")}
        </p>
        <p>продавац: {ad.fullname}</p>
        <p>број телефона: {ad.phone_number}</p>
      </div>
      {ad.image ? (
        <img
          src={`data:image/png;base64,${btoa(
            String.fromCharCode(...new Uint8Array(ad.image.data))
          )}`}
          alt={`Слика за ${ad.title}`}
        />
      ) : (
        <img src={noImage} alt={`Слика за ${ad.title}`} />
      )}
    </div>
  );
};

export default SearchElement;

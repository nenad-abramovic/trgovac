import React from "react";
import styles from "./SearchElement.module.css";
import { Link } from "react-router-dom";
import noImage from "../../assets/images/no_image.jpeg";

const SearchElement = ({ ad }) => {
  return (
    <div className={styles.container}>
      <div>
        <h3>
          <Link to={{ pathname: `/ad/${ad.ad_uuid}`, state: { ad } }}>
            {ad.title}
          </Link>
        </h3>
        <p>цена: {ad.price} динара</p>
        <p>
          датум објављивања: {new Date(ad.created_at).toLocaleString("sr-Cyrl")}
        </p>
        <p>продавац: {ad.fullname}</p>
      </div>
      <img
        src={
          ad.image_type
            ? `data:image/${ad.image_type};base64,${ad.image}`
            : noImage
        }
        alt={`Слика за ${ad.title}`}
      />
    </div>
  );
};

export default SearchElement;

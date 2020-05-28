import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./PriceList.module.css";

const PriceList = () => {
  const history = useHistory();

  return (
    <div>
      <h2 className={styles.title}>
        Све наше услуге су бесплатне! Хвала Вам на поверењу!
      </h2>
      <button className={styles.button} onClick={(e) => history.push("/")}>
        Погледај огласе
      </button>
    </div>
  );
};

export default PriceList;

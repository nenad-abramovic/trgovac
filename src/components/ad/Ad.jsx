import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import NewComment from "./NewComment";
import { useLocation } from "react-router-dom";
import { getComments } from "../../utilities/services";
import styles from "./Ad.module.css";

const Ad = () => {
  const { ad } = useLocation().state;
  const [adComments, setAdComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getComments(ad.ad_uuid)
      .then((data) => {
        console.log(data);
        setAdComments(data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  }, [ad.ad_uuid]);

  return (
    <div className={styles.container}>
      <div className={styles.adInfo}>
        <div>
          <h2>{ad.title}</h2>
          <h3>{ad.price}</h3>
          <h3>{ad.fullname}</h3>
          <h3>{ad.place}</h3>
          <p>{ad.description}</p>
          <p>{errorMessage}</p>
        </div>
        <div>
          <img
            src={`data:image/png;base64,${ad.image}`}
            alt={`Слика за ${ad.image}`}
          />
        </div>
      </div>
      <CommentList comments={adComments} />
      <NewComment adUUID={ad.ad_uuid} setAdComments={setAdComments} />
    </div>
  );
};

export default Ad;

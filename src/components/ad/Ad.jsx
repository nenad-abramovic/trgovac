import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import NewComment from "./NewComment";
import { useLocation } from "react-router-dom";
import { getComments } from "../../utilities/services";
import styles from "./Ad.module.css";

const Ad = () => {
  const { ad } = useLocation().state;
  const [adComments, setAdComments] = useState({
    data: [],
    success: false,
  });

  const getAdComments = (adUUID) => {
    getComments(adUUID).then((data) => {
      if (data.success) {
        setAdComments({ data: data.data, success: true });
      }
    });
  };

  useEffect(() => {
    getAdComments(ad.ad_uuid);
  }, [ad.ad_uuid]);

  return (
    <div className={styles.container}>
      <h2>{ad.title}</h2>
      <h3>{ad.price}</h3>
      <h3>{ad.fullname}</h3>
      <h3>{ad.place}</h3>
      <p>{ad.description}</p>
      <CommentList comments={adComments} />
      <NewComment adUUID={ad.ad_uuid} getAdComments={getAdComments} />
    </div>
  );
};

export default Ad;

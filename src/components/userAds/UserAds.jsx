import React, { useState, useEffect } from "react";
import SearchElement from "../search/SearchElement";
import { getUserAds } from "../../utilities/services";
import styles from "./UserAds.module.css";

const UserAds = ({ match }) => {
  const [userAds, setUserAds] = useState([]);
  const userUUID = match.params.user_uuid;

  useEffect(() => {
    getUserAds(userUUID)
      .then((data) => setUserAds(data))
      .catch((e) => {
        alert(e.message);
      });
  }, [userUUID]);

  return (
    <div>
      <h2 className={styles.title}>Огласи корисника {userAds[0]?.fullname}</h2>
      {userAds.map((ad) => (
        <SearchElement ad={ad} />
      ))}
    </div>
  );
};

export default UserAds;

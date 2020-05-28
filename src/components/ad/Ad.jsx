import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import NewComment from "./NewComment";

const Ad = ({ props }) => {
  const [ad, setAd] = useState({});
  useEffect(() => {
    getAd(props.match.params.ad_uuid).then((data) => {
      if (data.success) {
      }
    });
  }, []);
  return (
    <div>
      <h3>{ad.title}</h3>
      <h4>{ad.price}</h4>
      <h4>{ad.fullname}</h4>
      <h4>{ad.place}</h4>
      <p>{ad.description}</p>
      <CommentList comments={ad.comments} />
      <NewComment />
    </div>
  );
};

export default Ad;

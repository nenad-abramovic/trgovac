import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import NewComment from "./NewComment";
import { useLocation } from "react-router-dom";

const Ad = ({ match }) => {
  const { ad } = useLocation().state;
  const [adComments, setAdComments] = useState({
    data: [],
    success: false,
  });

  useEffect(() => {
    console.log(match, ad);
  }, []);

  return (
    <div>
      <h3>{ad.title}</h3>
      <h4>{ad.price}</h4>
      <h4>{ad.fullname}</h4>
      <h4>{ad.place}</h4>
      <p>{ad.description}</p>
      <CommentList comments={adComments.data} />
      <NewComment adUUID={ad.ad_uuid} />
    </div>
  );
};

export default Ad;

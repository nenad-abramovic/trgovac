import React, { useEffect, useState } from 'react';
import CommentList from './CommentList';
import NewComment from './NewComment';

const Ad = ({ props }) => {
  const [ad, setAd] = useState({});
  useEffect(() => {
    getAd(props.match.params.ad_uuid)
      
  }, []);
  return (
    <div>
      <CommentList />
      <NewComment />
    </div>
  );
}

export default Ad;
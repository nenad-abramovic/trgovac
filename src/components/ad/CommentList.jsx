import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
  return (
    <div>
      <p>Коментари</p>
      {comments.map((comment) => (
        <Comment key={comment.comment_uuid} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;

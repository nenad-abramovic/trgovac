import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
  return (
    <div>
      <p>Коментари</p>
      {comments ? (
        comments.map((comment) => (
          <Comment key={comment.comment_uuid} comment={comment} />
        ))
      ) : (
        <p>Нема коментара.</p>
      )}
    </div>
  );
};

export default CommentList;

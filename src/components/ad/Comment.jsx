import React from "react";

const Comment = ({ comment }) => {
  return (
    <div>
      <h4>
        {comment.fullname} - {comment.created_at}
      </h4>
      <p>{comment.text}</p>
    </div>
  );
};

export default Comment;

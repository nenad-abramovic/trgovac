import React from "react";

const Comment = ({ comment }) => {
  return (
    <div>
      <p>
        {comment.fullname} - {comment.created_at}
      </p>
      <p>{comment.text}</p>
    </div>
  );
};

export default Comment;

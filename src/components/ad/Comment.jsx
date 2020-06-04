import React from "react";
import styles from "./Comment.module.css";

const Comment = ({ comment }) => {
  return (
    <div>
      <h3>
        {comment.fullname} -{" "}
        {new Date(comment.created_at).toLocaleString("sr-Cyrl")}
      </h3>
      <p className={styles.comment}>{comment.text}</p>
    </div>
  );
};

export default Comment;

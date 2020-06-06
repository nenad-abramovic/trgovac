import React from "react";
import styles from "./Comment.module.css";

const Comment = ({ comment }) => {
  return (
    <div className={styles.container}>
      <span>
        {comment.fullname} -{" "}
        {new Date(comment.created_at).toLocaleString("sr-Cyrl")}
      </span>
      <p className={styles.comment}>{comment.text}</p>
    </div>
  );
};

export default Comment;

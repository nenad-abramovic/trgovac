import React from "react";
import Comment from "./Comment";
import styles from "./CommentList.module.css";

const CommentList = ({ comments }) => {
  return (
    <div className={styles.container}>
      <h2>Коментари</h2>
      {comments.map((comment) => (
        <Comment key={comment.comment_uuid} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;

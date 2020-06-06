import React from "react";
import { useForm } from "react-hook-form";
import { addComment } from "../../utilities/services";
import styles from "./NewComment.module.css";
import { useHistory } from "react-router-dom";

const NewComment = ({ setAdComments, adUUID }) => {
  const history = useHistory();
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = async ({ text }) => {
    addComment(text, adUUID)
      .then((data) => {
        setAdComments(data);
        reset();
      })
      .catch((e) => {
        if (e.status === 401) {
          window.localStorage.removeItem("userData");
          alert(e.message);
          history.push({
            pathname: "/login",
            state: { from: history.location },
          });
        } else {
          alert(e.message);
        }
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <p>Ваш коментар</p>
      <input
        type="text"
        name="text"
        ref={register({ required: "Унесите коментар." })}
      />
      {errors.text && <p>{errors.text.message}</p>}
      <button type="submit">Пошаљите</button>
    </form>
  );
};

export default NewComment;

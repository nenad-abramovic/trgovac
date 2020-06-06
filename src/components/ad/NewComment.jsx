import React from "react";
import { useForm } from "react-hook-form";
import { addComment } from "../../utilities/services";
import styles from "./NewComment.module.css";

const NewComment = ({ setAdComments, adUUID }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async ({ text }) => {
    try {
      let data = await addComment(text, adUUID);
      setAdComments(data);
    } catch (e) {
      alert("Грешка. Коментар није послат.");
    }
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

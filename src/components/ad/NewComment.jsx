import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { addComment } from "../../utilities/services";

const NewComment = ({ adUUID }) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async ({ text }) => {
    try {
      let data = await addComment(text, adUUID);
      if (data.success) {
        history.push(`/ad/${adUUID}`);
      } else {
        alert("Грешка. Коментар није послат.");
      }
    } catch (e) {
      alert("Грешка. Коментар није послат.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

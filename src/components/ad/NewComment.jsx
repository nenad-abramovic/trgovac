import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const NewComment = ({ ad_uuid }) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      let data = await addComment(data);
      if (data.success) {
        history.push(`/ad/${ad_uuid}`);
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

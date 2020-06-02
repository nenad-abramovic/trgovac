import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import UserContext from "../../utilities/user";
import styles from "./NewAd.module.css";
import { addAd } from "../../utilities/services";
import useCategories from "../../utilities/categories";

const NewAd = () => {
  const { register, handleSubmit, errors } = useForm({ mode: "onChange" });
  const user = useContext(UserContext);
  const history = useHistory();
  const [categories] = useCategories();

  const onSubmit = async (userData) => {
    try {
      let data = await addAd(userData);
      if (data.success) {
        delete data.success;
        user.setUser(data);
        window.localStorage.setItem("userData", JSON.stringify(data));
        history.push("/");
      } else {
        alert("Грешка са сервером. Покушајте поново.");
      }
    } catch (e) {
      alert("Грешка са сервером. Покушајте поново.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>нови оглас</h2>
      <input
        type="text"
        placeholder="Назив предмета"
        name="title"
        ref={register({
          required: { value: true, message: "Унесите назив предмета." },
        })}
      />
      {errors.title && <p>{errors.title.message}</p>}
      <textarea
        type="text"
        placeholder="Опис предмета"
        name="description"
        ref={register({
          required: { value: true, message: "Унесите опис предмета." },
        })}
      ></textarea>
      {errors.description && <p>{errors.description.message}</p>}
      <input
        type="number"
        placeholder="Цена предмета"
        name="price"
        min={1}
        ref={register({
          required: { value: true, message: "Унесите цену предмета." },
        })}
      />
      <span>динара</span>
      {errors.price && <p>{errors.price.message}</p>}
      <div>
        {categories.success ? (
          <select
            defaultValue=""
            name="category_uuid"
            ref={register({ required: "изаберите категорију" })}
          >
            <option style={{ display: "none" }} value="">
              категорија
            </option>
            {categories.data.map((category) => (
              <option
                key={category.category_uuid}
                value={category.category_uuid}
              >
                {category.name.toLowerCase()}
              </option>
            ))}
          </select>
        ) : (
          <p>сачекајте...</p>
        )}
        {errors.category_uuid && <p>{errors.category_uuid.message}</p>}
      </div>
      <div>
        <label htmlFor="image">Слика предмета</label>
        <input id="image" type="file" name="image" ref={register()} />
      </div>
      <div>
        <button type="submit">поставите оглас</button>
      </div>
    </form>
  );
};

export default NewAd;

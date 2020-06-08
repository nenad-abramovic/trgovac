import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styles from "./NewAd.module.css";
import { addAd } from "../../utilities/services";
import CategoryContext from "../../utilities/categories";

const NewAd = () => {
  const { register, handleSubmit, errors } = useForm({ mode: "onChange" });
  const history = useHistory();
  const { categories } = useContext(CategoryContext);
  const imageRef = useRef(null);
  const [image, setImage] = useState({ base64Image: "", type: "" });

  const handleChange = (e) => {
    let imageFile = e.target.files[0];
    if (imageFile > 204800) {
      return alert("Слика мора бити мања од 200KB");
    }

    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.addEventListener("load", () => {
      let type = reader.result.substring(
        reader.result.indexOf("/") + 1,
        reader.result.indexOf(";")
      );
      if (!/(png|jpeg|jpg|gif|bmp)/.test(type)) {
        return alert("Слика мора бити у png, jpeg, jpg, gif или bmp формату.");
      }

      let base64Image = reader.result.split("base64,")[1];
      setImage({ base64Image, type });
    });
  };

  const onSubmit = (userData) => {
    addAd(userData, image)
      .then((data) => {
        history.push({
          pathname: `/ad/${data.ad_uuid}`,
          state: { ad: data },
        });
      })
      .catch((e) => {
        if (e.status === 401) {
          window.localStorage.removeItem("userData");
          alert(e.message);
          history.push({
            pathname: "/login",
            state: { from: history.location },
          });
        } else if (e.status === 403) {
          alert(e.message);
          history.push("/profile");
        }
      });
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
            name="categoryUUID"
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
        {errors.categoryUUID && <p>{errors.categoryUUID.message}</p>}
      </div>
      <div>
        <label htmlFor="image">Слика предмета</label>
        <input
          id="image"
          type="file"
          name="image"
          ref={imageRef}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">поставите оглас</button>
      </div>
    </form>
  );
};

export default NewAd;

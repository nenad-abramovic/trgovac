import React, { useContext } from "react";
import styles from "./Profile.module.css";
import UserContext from "../../utilities/user";
import usePlaces from "../../utilities/places";
import { useForm } from "react-hook-form";
import { updateUser } from "../../utilities/services";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const places = usePlaces()[0];
  const place = places.data.find(
    (place) => place.place_uuid === user.data.place_uuid
  )?.name;
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: user.data.fullname,
      phoneNumber: user.data.phone_number,
      place_uuid: user.data.place_uuid,
    },
  });

  const onSubmit = async (userData) => {
    try {
      let data = await updateUser(userData);
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
      <div>
        <h2>Ваш профил</h2>
      </div>
      <div>
        <p>Е-маил</p>
        <h3>{user.data.email}</h3>
      </div>
      <div>
        <p>Име и презиме</p>
        <input
          type="text"
          name="fullname"
          ref={register({ required: "Унесите Ваше име и презиме." })}
        />
      </div>
      <div>
        <p>Број телефона</p>
        <input type="text" name="phoneNumber" ref={register} />
      </div>
      <div>
        <p>Место пребивалишта</p>
        <select
          defaultValue={place}
          name="placeUUID"
          ref={register({ minLength: 1 })}
        >
          <option value="" style={{ display: "none" }}>
            изабери место
          </option>
          {places.data.map((place) => (
            <option key={place.place_uuid} value={place.place_uuid}>
              {place.name.toLowerCase()}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Ажурирај</button>
    </form>
  );
};

export default Profile;

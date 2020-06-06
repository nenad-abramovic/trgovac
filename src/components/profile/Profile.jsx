import React, { useContext } from "react";
import styles from "./Profile.module.css";
import UserContext from "../../utilities/user";
import usePlaces from "../../utilities/places";
import { useForm } from "react-hook-form";
import { updateUser } from "../../utilities/services";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const places = usePlaces()[0];

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: user.fullname,
      phoneNumber: user.phone_number,
      placeUUID: user.place_uuid,
    },
  });

  const onSubmit = async (userData) => {
    updateUser(userData)
      .then((data) => {
        setUser(data);
        window.localStorage.setItem("userData", JSON.stringify(data));
        history.push("/");
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
      <div>
        <h2>Ваш профил</h2>
      </div>
      <div>
        <p>Е-маил</p>
        <h3>{user.email}</h3>
      </div>
      <div>
        <p>Име и презиме</p>
        <input
          type="text"
          name="fullname"
          ref={register({ required: "Унесите Ваше име и презиме." })}
        />
        {errors.fullname && <p>{errors.fullname.message}</p>}
      </div>
      <div>
        <p>Број телефона</p>
        <input type="text" name="phoneNumber" ref={register} />
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
      </div>
      <div>
        <p>Место пребивалишта</p>
        <select
          name="placeUUID"
          ref={register({ minLength: 1 })}
          defaultValue={user.place_uuid}
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
        {errors.placeUUID && <p>{errors.placeUUID.message}</p>}
      </div>
      <button type="submit">Ажурирај</button>
    </form>
  );
};

export default Profile;

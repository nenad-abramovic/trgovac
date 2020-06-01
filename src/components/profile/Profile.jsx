import React, { useContext } from "react";
import styles from "./Profile.module.css";
import UserContext from "../../utilities/user";
import usePlaces from "../../utilities/places";

const Profile = () => {
  const {
    user: { data },
  } = useContext(UserContext);
  const [places] = usePlaces();
  const place = places.data.find(
    (place) => place.place_uuid === data.place_uuid
  )?.name;
  return (
    <div className={styles.container}>
      <div>
        <h2>Ваш профил</h2>
      </div>
      <div>
        <p>е-маил</p>
        <h3>{data.email}</h3>
      </div>
      <div>
        <p>име и презиме</p>
        <input type="text" value={data.fullname} />
      </div>
      <div>
        <p>број телефона</p>
        <input type="text" value={data.phone_number} />
      </div>
      <div>
        <p>место пребивалишта</p>
        <select defaultValue={place}>
          <option value="">изабери место</option>
          {places.data.map((place) => (
            <option key={place.place_uuid} value={place.name}>
              {place.name.toLowerCase()}
            </option>
          ))}
        </select>
      </div>
      <button>потврди промене</button>
    </div>
  );
};

export default Profile;

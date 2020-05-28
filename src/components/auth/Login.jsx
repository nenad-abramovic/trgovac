import React, { useState, useContext } from "react";
import { loginUser } from "../../utilities/services";
import UserContext from "../../utilities/user";
import { useHistory, Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const history = useHistory();
  const user = useContext(UserContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    message: "",
  });

  const handleClick = async () => {
    let data = await loginUser({
      email: userData.email,
      password: userData.password,
    });
    if (data.success) {
      delete data.success;
      user.setUser(data);
      window.localStorage.setItem("userData", JSON.stringify(data));
      history.push("/");
    } else {
      setUserData({ ...userData, message: data.message });
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <h2>пријавите се</h2>
      <p>{userData.message}</p>
      <input
        type="email"
        placeholder="Унесите е-маил..."
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Унесите шифру..."
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <div>
        <Link to="/register">региструјте се</Link>
        <button type="submit" onClick={handleClick}>
          пријавите се
        </button>
      </div>
    </form>
  );
};

export default Login;

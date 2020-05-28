import React, { useState, useContext } from "react";
import { loginUser } from "../../utilities/services";
import UserContext from "../../utilities/user";
import { useHistory, Link } from "react-router-dom";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";

const Login = () => {
  const history = useHistory();
  const user = useContext(UserContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    message: "",
  });
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (userData, e) => {
    console.log(userData);
    console.log(e);
    try {
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
    } catch (e) {
      alert("Грешка са сервером. Покушајте поново.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>пријавите се</h2>
      <p>{userData.message}</p>
      <input
        type="email"
        placeholder="Унесите е-маил..."
        name="email"
        ref={register({
          required: { value: true, message: "Унесите Ваш емаил." },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        type="password"
        placeholder="Унесите шифру..."
        name="password"
        ref={register({
          required: { value: true, message: "Унесите Вашу шифру." },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <div>
        <Link to="/register">региструјте се</Link>
        <button type="submit">пријавите се</button>
      </div>
    </form>
  );
};

export default Login;

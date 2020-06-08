import React, { useContext } from "react";
import { registerUser } from "../../utilities/services";
import UserContext from "../../utilities/user";
import { useHistory, Link } from "react-router-dom";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit, errors, watch } = useForm({
    mode: "onChange",
  });
  const user = useContext(UserContext);
  const history = useHistory();
  const watchPassword = watch("password");

  const onSubmit = (userData) => {
    registerUser(userData)
      .then((data) => {
        user.setUser(data);
        window.localStorage.setItem("userData", JSON.stringify(data));
        history.push("/profile");
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>региструјте се</h2>
      <input
        type="email"
        placeholder="Унесите е-маил..."
        name="email"
        ref={register({
          required: "Поље је обавезно.",
          pattern: { value: /^.+@.+\..+$/, message: "Унесите валидан емаил." },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        type="password"
        placeholder="Унесите шифру..."
        name="password"
        ref={register({
          required: "Поље је обавезно.",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
            message:
              "Шифра мора имати минимум 8 карактера, барем једно мало и велико слово и један број.",
          },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <input
        type="password"
        placeholder="Поновите шифру..."
        name="confirmPassword"
        ref={register({
          required: "Поље је обавезно.",
          validate: (value) => value === watchPassword,
        })}
      />
      {errors.confirmPassword && <p>Поновите шифру.</p>}
      <div>
        <Link to="/login">пријавите се</Link>
        <button type="submit">региструјте се</button>
      </div>
    </form>
  );
};

export default Register;

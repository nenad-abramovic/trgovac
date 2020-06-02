import React, { useContext } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import UserContext from "../utilities/user";

const links = [
  {
    to: "/",
    text: "најновији огласи",
  },
  {
    to: "/new_ad",
    text: "поставите оглас",
  },
  {
    to: "/profile",
    text: "профил",
  },
];

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("userData");
  };

  return (
    <header className={styles.container}>
      <h1 className={styles.title}>трговац.цом</h1>
      <nav className={styles.navigation}>
        <ul>
          {user ? (
            <li>
              <Link to="/" onClick={logout}>
                одјавите се
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">пријавите се</Link>
            </li>
          )}
          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

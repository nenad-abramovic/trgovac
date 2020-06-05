import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/register">Региструјте се</Link>
      <Link to="/pricelist">Ценовник</Link>
      <label>&copy;абрамовић ненад 2020</label>
      <Link to="/docs">АПИ Документација</Link>
      <span className={styles.totop} onClick={() => window.scrollTo(0, 0)}>
        на врх
      </span>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <a href="http://localhost:4000">АПИ Документација</a>
      <Link to="/register">Региструјте се</Link>
      <label>&copy;Абрамовић Ненад 2020</label>
      <span onClick={() => window.scrollTo(0, 0)}>На врх</span>
    </footer>
  );
};

export default Footer;
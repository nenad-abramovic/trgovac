import React, { useContext } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import UserContext from '../utilities/user';

const links = [
  {
    to: '',
    text: 'Најновији огласи'
  }, {
    to: 'new_ad',
    text: 'Поставите оглас'
  }, {
    to: 'profile',
    text: 'Профил'
  }, {
    to: 'pricelist',
    text: 'Ценовник'
  }
];

const Header = () => {
  const {user, setUser} = useContext(UserContext);
  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('userData');
  }

  return (
    <header className={styles.container}>
      <h1 className={styles.title}>трговац.цом</h1>
      <nav className={styles.navigation}>
        <ul>
          {
            user
              ? <button onClick={logout}>Одјавите се</button>
              : <Link to="/login">Пријавите се</Link>
          }
          {
            links.map(link => (
              <li key={link.to}><Link to={link.to}>{link.text}</Link></li>
            ))
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;
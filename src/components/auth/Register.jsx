import React, { useState, useContext } from 'react';
import { registerUser } from '../../utilities/services';
import UserContext from '../../utilities/user';
import { useHistory, Link } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const history = useHistory();
  const user = useContext(UserContext);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    message: ''
  });

  const handleClick = async () => {
    let data = await registerUser(userData);
    if(data.success) {
      delete data.success;
      user.setUser(data);
      window.localStorage.setItem('userData', JSON.stringify(data));
      history.push('/profile');
    } else {
      setUserData({ ...userData, message: data.message });
    }
  }

  return (
    <form className={styles.form} onSubmit={e => e.preventDefault()}>
      <h2>региструјте се</h2>
      <p>{userData.message}</p>
      <input type="email" placeholder="Унесите е-маил..." value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} />
      <input type="password" placeholder="Унесите шифру..." value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} />
      <input type="password" placeholder="Поновите шифру..." value={userData.confirmPassword} onChange={e => setUserData({ ...userData, confirmPassword: e.target.value })} />
      <div>
        <Link to="/login">пријавите се</Link>
        <button type="submit" onClick={handleClick} >региструјте се</button>
      </div>
    </form>
  );
};

export default Register;
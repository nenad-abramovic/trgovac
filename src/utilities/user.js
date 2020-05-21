let token = window.localStorage.getItem('token');

let isLoggedIn = () => token !== null;

export default isLoggedIn;
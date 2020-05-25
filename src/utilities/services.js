const BASE_URL = 'http://localhost:4000';
const ADS = '/ads';
const USERS = '/users';

const getAds = async (category='%', place='%') => {
  try {
    let data = await fetch(`${BASE_URL}${ADS}?category=${category}&place=${place}`);
    let json = await data.json();
    return json;
  } catch(e) {
    console.error(e);
  }
}

const registerUser = async (userData) => {
  try {
    let data = await fetch(`${BASE_URL}${USERS}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userData)
    });
    let json = await data.json();
    return json;
  } catch (e) {
    console.error(e);
  }
};

const loginUser = async (userData) => {
  try {
    let data = await fetch(`${BASE_URL}${USERS}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userData)
    });
    let json = await data.json();
    return json;
  } catch (e) {
    console.error(e);
  }
};



export {
  getAds,
  registerUser,
  loginUser,
}
const ADS = "/ads";
const USERS = "/users";
const COMMENTS = "/comments";

const getAds = async (category = "%", place = "%") => {
  try {
    let data = await fetch(
      encodeURI(`${ADS}?category=${category}&place=${place}`)
    );
    let json = await data.json();
    return json;
  } catch (e) {
    console.error(e);
  }
};

const getAd = async (ad_uuid) => {
  try {
    let data = await fetch(`${ADS}/${ad_uuid}`);
    let json = await data.json();
    return json;
  } catch (e) {
    console.error(e);
  }
};

const registerUser = async (userData) => {
  try {
    let data = await fetch(`${USERS}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    let json = await data.json();
    return json;
  } catch (e) {
    console.error(e);
  }
};

const loginUser = async (userData) => {
  try {
    let data = await fetch(`${USERS}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    let json = await data.json();
    return json;
  } catch (e) {
    console.error(e);
  }
};

const getComments = async (ad_uuid) => {
  try {
    let data = await fetch(`${ADS}${COMMENTS}/${ad_uuid}`);
    let json = await data.json();
    return json;
  } catch (e) {
    console.error(e);
  }
};

const addComment = async (text, adUUID) => {
  try {
    let { token } = JSON.parse(window.localStorage.getItem("userData"));
    let data = await fetch(`${ADS}${COMMENTS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text,
        adUUID,
      }),
    });
    let json = await data.json();
    return json;
  } catch (e) {
    console.error(e);
  }
};

export { getAds, getAd, registerUser, loginUser, addComment, getComments };

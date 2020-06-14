import RequestError from "./error";
const API = "/api";
const ADS = "/products";
const USERS = "/users";
const COMMENTS = "/comments";

const getAds = (category, place) => {
  return fetch(
    encodeURI(`${API}${ADS}?category=${category}&place=${place}`)
  ).then((res) => {
    let message = "";
    switch (res.status) {
      case 200:
        return res.json();
      case 400:
        message = "Прослеђени параметри нису валидни.";
        break;
      default:
        message = "Грешка са сервером.";
    }
    throw new RequestError(res.status, message);
  });
};

const getUserAds = (userUUID) => {
  return fetch(`${API}${ADS}/${userUUID}`).then((res) => {
    let message = "";
    switch (res.status) {
      case 200:
        return res.json();
      case 400:
        message = "Корисников идентификациони број није валидан.";
        break;
      default:
        message = "Грешка са сервером.";
    }
    throw new RequestError(res.status, message);
  });
};

const getAd = (ad_uuid) => {
  return fetch(`${API}${ADS}/${ad_uuid}`).then((res) => {
    let message = "";
    switch (res.status) {
      case 200:
        return res.json();
      case 400:
        message = "Идентификациони број огласа није валидан.";
        break;
      default:
        message = "Грешка са сервером.";
    }
    throw new RequestError(res.status, message);
  });
};

const registerUser = (userData) => {
  return fetch(`${API}${USERS}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  }).then((res) => {
    let message = "";
    switch (res.status) {
      case 201:
        return res.json();
      case 400:
        message = "Е-маил или шифра нису прослеђени или шифра није потврђена.";
        break;
      case 401:
        message = "Е-маил је већ у употреби.";
        break;
      default:
        message = "Грешка са сервером.";
    }
    throw new RequestError(res.status, message);
  });
};

const loginUser = (userData) => {
  return fetch(`${API}${USERS}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  }).then((res) => {
    let message = "";
    switch (res.status) {
      case 200:
        return res.json();
      case 400:
        message = "Е-маил или шифра нису прослеђени.";
        break;
      case 403:
        message = "Е-маил или шифра нису добри.";
        break;
      default:
        message = "Грешка са сервером.";
    }
    throw new RequestError(res.status, message);
  });
};

const updateUser = (userData) => {
  let { token } = JSON.parse(window.localStorage.getItem("userData"));
  return fetch(`${API}${USERS}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  }).then((res) => {
    let message = "";
    switch (res.status) {
      case 200:
        return res.json();
      case 400:
        message =
          "Име и презиме или место пребивалишта нису прослеђени или нису валидни.";
        break;
      case 401:
        message = "Корисник није верификован. Молимо улогујте се.";
        break;
      default:
        message = "Грешка са сервером.";
    }
    throw new RequestError(res.status, message);
  });
};

const getComments = (ad_uuid) => {
  return fetch(`${API}${ADS}${COMMENTS}/${ad_uuid}`).then((res) => {
    let message = "";
    switch (res.status) {
      case 200:
        return res.json();
      case 400:
        message =
          "Идентификациони број огласа није прослеђен или није валидан.";
        break;
      default:
        message = "Грешка са сервером.";
    }
    throw new RequestError(res.status, message);
  });
};

const addComment = (text, adUUID) => {
  let token = JSON.parse(window.localStorage.getItem("userData"))?.token;
  return fetch(`${API}${ADS}${COMMENTS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text,
      adUUID,
    }),
  }).then((res) => {
    let message = "";
    switch (res.status) {
      case 201:
        return res.json();
      case 400:
        message =
          "Коментар није прослеђен или идентификациони број огласа није исправан.";
        break;
      case 401:
        message = "Корисник није верификован. Молимо улогујте се.";
        break;
      case 403:
        message =
          "Молимо попуните профил пре него што почнете да постављате огласе.";
        break;
      default:
        message = "Грешка са сервером.";
    }
    throw new RequestError(res.status, message);
  });
};

const addAd = (adData, image) => {
  let { token } = JSON.parse(window.localStorage.getItem("userData"));
  adData.image = image;

  return fetch(`${API}${ADS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(adData),
  }).then((res) => {
    let message = "";
    switch (res.status) {
      case 201:
        return res.json();
      case 400:
        message = "Није прослеђен идентификациони број огласа.";
        break;
      case 401:
        message = "Корисник није верификован. Молимо улогујте се.";
        break;
      case 403:
        message =
          "Молимо попуните профил пре него што почнете да коментаришете огласе.";
        break;
      default:
        message = "Грешка са сервером.";
    }
    throw new RequestError(res.status, message);
  });
};

const deleteAd = (adUUID) => {
  let { token } = JSON.parse(window.localStorage.getItem("userData"));
  return fetch(`${API}${ADS}/${adUUID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    let message = "";
    switch (res.status) {
      case 200:
        return res;
      case 400:
        message = "Није прослеђен идентификациони број огласа.";
        break;
      case 401:
        message = "Корисник није верификован. Молимо улогујте се.";
        break;
      default:
        message = "Грешка са сервером.";
    }
    throw new RequestError(res.status, message);
  });
};

export {
  getAds,
  getUserAds,
  getAd,
  registerUser,
  loginUser,
  updateUser,
  addComment,
  getComments,
  addAd,
  deleteAd,
};

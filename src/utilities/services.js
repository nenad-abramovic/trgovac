const ADS = "/ads";
const USERS = "/users";
const COMMENTS = "/comments";

const getAds = (category, place) => {
  return fetch(encodeURI(`${ADS}?category=${category}&place=${place}`)).then(
    (res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 400) {
        throw new Error("Прослеђени параметри нису валидни.");
      } else {
        throw new Error("Грешка са сервером.");
      }
    }
  );
};

const getAd = (ad_uuid) => {
  return fetch(`${ADS}/${ad_uuid}`).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else if (res.status === 400) {
      throw new Error("Корисников идентификациони број није валидан.");
    } else {
      throw new Error("Грешка са сервером.");
    }
  });
};

const registerUser = (userData) => {
  return fetch(`${USERS}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  }).then((res) => {
    if (res.status === 201) {
      return res.json();
    } else if (res.status === 400) {
      throw new Error(
        "Е-маил или шифра нису прослеђени или шифра није потврђена."
      );
    } else {
      throw new Error("Грешка са сервером.");
    }
  });
};

const loginUser = (userData) => {
  return fetch(`${USERS}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else if (res.status === 400) {
      throw new Error("Е-маил или шифра нису прослеђени.");
    } else if (res.status === 403) {
      throw new Error("Е-маил или шифра нису добри.");
    } else {
      throw new Error("Грешка са сервером.");
    }
  });
};

const updateUser = (userData) => {
  let { token } = JSON.parse(window.localStorage.getItem("userData"));
  return fetch(`${USERS}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else if (res.status === 400) {
      throw new Error(
        "Име и презиме или место пребивалишта нису прослеђени или нису валидни."
      );
    } else if (res.status === 401) {
      throw new Error("Корисник није верификован. Молимо улогујте се.");
    } else {
      throw new Error("Грешка са сервером.");
    }
  });
};

const getComments = (ad_uuid) => {
  return fetch(`${ADS}${COMMENTS}/${ad_uuid}`).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else if (res.status === 400) {
      throw new Error(
        "Идентификациони број огласа није прослеђен или није валидан."
      );
    } else {
      throw new Error("Грешка са сервером.");
    }
  });
};

const addComment = (text, adUUID) => {
  let { token } = JSON.parse(window.localStorage.getItem("userData"));
  return fetch(`${ADS}${COMMENTS}`, {
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
    if (res.status === 201) {
      return res.json();
    } else if (res.status === 400) {
      throw new Error(
        "Коментар није прослеђен или идентификациони број огласа није исправан."
      );
    } else if (res.status === 401) {
      throw new Error("Корисник није верификован. Молимо улогујте се.");
    } else {
      throw new Error("Грешка са сервером.");
    }
  });
};

const addAd = (adData) => {
  let { token } = JSON.parse(window.localStorage.getItem("userData"));
  return fetch(`${ADS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(adData),
  }).then((res) => {
    if (res.status === 201) {
      return res.json();
    } else if (res.status === 400) {
      throw new Error(
        "Нису прослеђени сви непоходни подаци о огласу или нису исправно форматирани."
      );
    } else if (res.status === 401) {
      throw new Error("Корисник није верификован. Молимо улогујте се.");
    } else {
      throw new Error("Грешка са сервером.");
    }
  });
};

const deleteAd = (adUUID) => {
  let { token } = JSON.parse(window.localStorage.getItem("userData"));
  return fetch(`${ADS}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      adUUID,
    }),
  }).then((res) => {
    if (res.status === 200) {
      return res;
    } else if (res.status === 400) {
      throw new Error("Није прослеђен идентификациони број огласа.");
    } else if (res.status === 401) {
      throw new Error("Корисник није верификован. Молимо улогујте се.");
    } else {
      throw new Error("Грешка са сервером.");
    }
  });
};

export {
  getAds,
  getAd,
  registerUser,
  loginUser,
  updateUser,
  addComment,
  getComments,
  addAd,
  deleteAd,
};

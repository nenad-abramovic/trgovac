const jwt = require("jsonwebtoken");

const signToken = (email) => {
  return jwt.sign({ sub: email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30 days",
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY).sub;
  } catch (e) {
    return false;
  }
};

module.exports = {
  signToken,
  verifyToken,
};

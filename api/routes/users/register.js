const { body, validationResult } = require("express-validator");
const pool = require("../../db");
const bcrypt = require("bcrypt");
const { signToken } = require("../../utilities/token");

const SALT = 10;

const registerValidation = [
  body("email").isEmail(),
  body("password")
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/),
  body("confirmPassword").custom(
    (value, { req }) => value === req.body.password
  ),
];

const register = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).end();
  }

  try {
    let password = await bcrypt.hash(req.body.password, SALT);
    let data = await pool.query({
      text: "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
      values: [req.body.email, password],
    });

    let userData = data.rows[0];
    let token = signToken(userData.email);
    userData.token = token;
    delete userData.password;

    return res.status(201).json(userData);
  } catch (e) {
    return res.status(500).end();
  }
};

module.exports = {
  registerValidation,
  register,
};

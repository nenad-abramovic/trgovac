const pool = require("../../db");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { signToken } = require("../../utilities/token");

const loginValidation = [body("email").isEmail(), body("password").exists()];

const login = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).end();
    }

    let data = await pool.query({
      text: "SELECT * FROM users WHERE email=$1",
      values: [req.body.email],
    });
    if (data.rowCount === 0) {
      return res.status(403).end();
    }

    const match = await bcrypt.compare(
      req.body.password,
      data.rows[0].password
    );

    if (match) {
      let userData = data.rows[0];
      let token = signToken(userData.email);
      delete userData.password;
      userData.token = token;

      return res.status(200).json(userData);
    }

    return res.status(403).end();
  } catch (e) {
    return res.status(500).end();
  }
};

module.exports = {
  loginValidation,
  login,
};

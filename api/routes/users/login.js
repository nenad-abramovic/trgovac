const pool = require("../../db");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { signToken } = require("../../utilities/token");

const loginValidation = [
  body("email", "Е-маил није валидан").isEmail(),
  body("password", "Шифра није прослеђена").exists(),
];

const login = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    let data = await pool.query({
      text: "SELECT * FROM users WHERE email=$1",
      values: [req.body.email],
    });
    if (data.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Е-маил или шифра нису валидни.",
      });
    }

    const match = await bcrypt.compare(
      req.body.password,
      data.rows[0].password
    );

    if (match) {
      let token = signToken(data.rows[0].email);

      delete data.rows[0].password;

      return res.status(201).json({
        success: true,
        token,
        data: data.rows[0],
      });
    }

    return res.status(403).json({
      success: false,
      message: "Е-маил или шифра нису валидни.",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      errors: e,
    });
  }
};

module.exports = {
  loginValidation,
  login,
};

const { body, validationResult } = require('express-validator');
const pool = require('../../db');
const bcrypt = require('bcrypt');
const { signToken } = require('../../utilities/token');

const SALT = 10;

let registerValidation = [
  body('email', 'Е-маил није валидан.')
    .isEmail(),
  body('password', 'Шифра мора садржати минимум 8 карактера. Једно мало, једно велико слово и један број.')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/),
  body('confirmPassword', 'Шифре се не подударају.').custom(
    (value, { req }) => value === req.body.password
  ),
];

let register = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    let password = await bcrypt.hash(req.body.password, SALT);
    await pool.query({
      text: 'INSERT INTO users(email, password) VALUES($1, $2)',
      values: [req.body.email, password]
    });

    let token = signToken(data.rows[0].email);

    return res.status(200).json({
      success: true,
      token,
      email: req.body.email
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      errors: e
    });
  }
};

module.exports = {
  registerValidation,
  register
}
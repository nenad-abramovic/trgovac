const { body, validationResult } = require('express-validator');
const pool = require('../../db');
const jwt = require('jsonwebtoken');

let updateUserValidation = [
  body("token", "Токен није испоручен.")
    .isJWT(),
  body("email", "Е-маил није валидан.")
    .isEmail(),
  body("fullname", "Име је неисправно.")
    .optional({ checkFalsy: true })
    .matches(/^[A-Za-z][A-Za-z.]{2,}$/),
  body("placeOfResidence", "Место пребивалишта је неисправно.")
    .optional({ checkFalsy: true })
    .matches(/^[A-Za-z][A-Za-z.]{2,}$/),
  body("phoneNumber", "Број телефона је неисправан")
    .optional({ checkFalsy: true })
    .isMobilePhone("sr-RS")
];

let updateUser = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    let data = await pool.query({
      text: 'UPDATE users SET fullname=$2, place_of_residence=$3, phone_number=$4 WHERE email=$1 RETURNING *',
      values: [req.body.email, req.body.fullname, req.body.placeOfBirth, req.body.phoneNumber]
    });

    return res.status(200).json({
      success: true,
      ...data.rows[0]
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      errors: e
    });
  }
};

module.exports = {
  updateUserValidation,
  updateUser
}
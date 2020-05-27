const { body, validationResult, header } = require('express-validator');
const pool = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addValidator = [
  header("Authorization")
    .exists()
    .bail()
    .custom(value => {
      jwt.verify(value.split(" ")[1],)
    })
];


let registerValidation = [
  body("email", "Е-маил није валидан.")
    .isEmail(),
  body("password", "Шифра мора садржати минимум 8 карактера. Једно мало, једно велико слово и један број.")
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/),
  body("confirmPassword", "Шифре се не подударају.").custom(
    (value, { req }) => value === req.body.password
  ),
];

const addAd = async (req, res, next) => {
  try {
    await pool.query({
      text: `INSERT INTO ads(title, description, price, category_uuid, user_uuid, image) 
            VALUES($1, $2, $3, $4, $5, decode($6, 'base64'))`,
      values: [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.category_uuid,
        req.body.user_uuid,
        req.body.image
      ]
    });

    return res.status(201).json({
      success: true
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      errors: e
    });
  }
};

module.exports = {
  addAd,
  addValidator
}
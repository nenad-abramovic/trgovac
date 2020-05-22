const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db');


// Register
router.post('/', [
  body("email", "Е-маил није валидан.")
    .isEmail(),
  body("password", "Шифра мора садржати минимум 8 карактера. Једно мало, једно велико слово и један број.")
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/),
  body("confirmPassword", "Шифре се не подударају.").custom(
    (value, { req }) => value === req.body.password
  ),
], async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    await pool.query({
      text: 'INSERT INTO users(email, password) VALUES($1, $2)', 
      values: [req.body.email, req.body.password]
    });
    return res.json({
      success: true,
      token: '1234'
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      errors: e
    });
  }
});


// Login
router.get('/', async (req, res, next) => {

});

// Update user data
router.put('/', async (req, res, next) => {

});

module.exports = router;
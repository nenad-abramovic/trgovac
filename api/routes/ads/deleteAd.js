const pool = require('../../db');
const { body, validationResult } = require('express-validator');

const loginValidation = [
  body('email', 'Е-маил није валидан')
  .isEmail(),
  body('password', 'Шифра није прослеђена')
  .exists()
];

module.exports = async (req, res, next) => {
  try {
    await pool.query({
      text: 'DELETE FROM ads WHERE email=$1',
      values: [ req.body.email ]
    });

    return res.status(200).json({
      success: true,
      message: 'Оглас је избрисан.'
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      errors: e
    });
  }
};
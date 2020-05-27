const pool = require('../../db');
const { header, body, validationResult } = require('express-validator');

const deleteAdValidation = [
  header('Authorization', 'Токен није испоручен.')
    .exists(),
  body('adUUID', 'Оглас није испоручен.')
    .isUUID(),
];

const deleteAd = async (req, res, next) => {
  let email = verifyToken(req.header['Authorization'].split(' ')[1]);
  let errors = validationResult(req);
  
  if (!(errors.isEmpty() && email)) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    await pool.query({
      text: 'DELETE FROM ads JOIN users USING(user_uuid) WHERE ad_uuid=$1 AND email=$2',
      values: [ req.body.adUUID, email ]
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

module.exports = {
  deleteAdValidation,
  deleteAd
};
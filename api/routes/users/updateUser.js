const { header, body, validationResult } = require('express-validator');
const pool = require('../../db');
const { verifyToken } = require('../../utilities/token');

let updateUserValidation = [
  header('Authorization', 'Токен није испоручен.')
    .exists(),
  body('fullname', 'Име је неисправно.')
    .matches(/^.{3,}$/),
  body('placeUUID', 'Место пребивалишта је неисправно.')
    .isUUID(),
  body('phoneNumber', 'Број телефона је неисправан')
    .optional({ checkFalsy: true })
    .isMobilePhone('sr-RS')
];

let updateUser = async (req, res, next) => {
  let email = verifyToken(req.header['Authorization'].split(' ')[1]);
  let errors = validationResult(req);
  
  if (!errors.isEmpty() && email) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    let data = await pool.query({
      text: 'UPDATE users SET fullname=$2, place_uuid=$3, phone_number=$4 WHERE email=$1 RETURNING *',
      values: [email, req.body.fullname, req.body.placeUUID, req.body.phoneNumber]
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
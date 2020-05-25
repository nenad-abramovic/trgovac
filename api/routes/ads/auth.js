const pool = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT = 10;

module.exports = async (req, res, next) => {
  return next();
  let token = req.headers.authorization.split(' ')[1];
  let { email } = jwt.decode(token);

  try {
    let data = await pool.query({
      text: 'SELECT password FROM users WHERE email=$1',
      values: [ email ]
    });
  
    if(data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Неважећи токен.'
      });
    }

    next();
  } catch(e) {
    return res.status(500).json({
      success: false,
      errors: e 
    });
  }


};
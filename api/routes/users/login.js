const pool = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    let data = await pool.query({
      text: 'SELECT email, fullname, place_uuid, phone_number, password FROM users WHERE email=$1',
      values: [req.body.email]
    });
    console.log(data.rows);
    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Е-маил или шифра нису валидни.'
      });
    }
    
    const match = await bcrypt.compare(req.body.password, data.rows[0].password);
    console.log('sdasd', data.rows, match);

    if (match) {
      let token = jwt.sign(
        { email: req.body.email },
        req.body.password,
        { expiresIn: "2 minutes" }
      );

      delete data.rows[0].password;

      return res.status(201).json({
        success: true,
        token,
        data: data.rows[0]
      });
    }

    return res.status(403).json({
      success: false,
      message: "Е-маил или шифра нису валидни."
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      errors: e
    });
  }
};
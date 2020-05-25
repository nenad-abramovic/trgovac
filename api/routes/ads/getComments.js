const pool = require('../../db');

module.exports = async (req, res, next) => {
  try {
    let data = await pool.query({
      text: 'SELECT * FROM comments WHERE email=$1',
      values: [ req.body.email ]
    });

    return res.status(201).json({
      success: true,
      ...data.rows
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      errors: e
    });
  }
};
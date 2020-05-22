const pool = require('../../db');

module.exports = async (req, res, next) => {
  try {
    let data = await pool.query({
      text: `INSERT INTO ads(title, description, price, category_uuid, user_uuid, image) 
            VALUES($1, $2, $3, $4, $5, decode($6, 'base64'))
      `,
      values: [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.category_uuid,
        user_uuid,
        image
      ]
    });

    return res.status(201).json({
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
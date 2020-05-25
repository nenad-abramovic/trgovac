const pool = require('../../db');

module.exports = async (req, res, next) => {
  if (req.param.user_uuid !== '') {
    try {
      let data = await pool.query({
        text: `SELECT ad_uuid, created_at, title, description, price, category_uuid, user_uuid, image, place_uuid, fullname, phone_number 
        FROM ads
        JOIN users USING(user_uuid) 
        JOIN categories USING(category_uuid)
        JOIN places USING(place_uuid)
        WHERE user_uuid=$1`,
        values: [req.param.user_uuid]
      });
      return res.status(200).json({
        success: true,
        data: data.rows
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        errors: e
      });
    }
  }

  try {
    let data = await pool.query({
      text: `SELECT ad_uuid, created_at, title, description, price, category_uuid, user_uuid, image, place_uuid, fullname, phone_number 
        FROM ads
        JOIN users USING(user_uuid) 
        JOIN categories USING(category_uuid)
        JOIN places USING(place_uuid)
        WHERE categories.name ILIKE COALESCE($1, '%') AND places.name ILIKE COALESCE($2, '%')`,
      values: [req.query.category, req.query.place]
    });
    return res.status(200).json({
      success: true,
      data: data.rows
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      errors: e
    });
  }
};
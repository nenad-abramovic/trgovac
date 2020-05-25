const pool = require('../../db');

const addValidator = [

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
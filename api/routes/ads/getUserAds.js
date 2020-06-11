const pool = require("../../db");
const { param, validationResult } = require("express-validator");

const userAdsValidation = [
  param("userUUID").optional({ checkFalsy: true }).isUUID(),
];

const getUserAds = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).end();
    }

    let data = await pool.query({
      text: `SELECT ad_uuid, created_at, title, description, price::numeric::float8, category_uuid, user_uuid, encode(image, 'base64') as image, image_type, place_uuid, fullname, phone_number 
        FROM ads
        JOIN users USING(user_uuid) 
        JOIN categories USING(category_uuid)
        JOIN places USING(place_uuid)
        WHERE user_uuid=$1
        ORDER BY created_at DESC`,
      values: [req.params.userUUID],
    });

    return res.status(200).json(data.rows);
  } catch (e) {
    return res.status(500).end();
  }
};

module.exports = {
  userAdsValidation,
  getUserAds,
};

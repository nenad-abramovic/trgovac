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
      text: `SELECT ad_uuid, created_at, title, description, price::numeric, category_uuid, user_uuid, encode(image, 'base64') as image, place_uuid, fullname, phone_number 
        FROM ads
        JOIN users USING(user_uuid) 
        JOIN categories USING(category_uuid)
        JOIN places USING(place_uuid)
        WHERE user_uuid=$1`,
      values: [req.param.userUUID],
    });

    console.log("bbb", req.param.userUUID, data.rows);

    return res.status(200).json(data.rows);
  } catch (e) {
    return res.status(500).end();
  }
};

module.exports = {
  userAdsValidation,
  getUserAds,
};

const pool = require("../../db");
const { query, validationResult } = require("express-validator");

const adsValidation = [
  query("category")
    .optional({ checkFalsy: true })
    .custom(async (value) => {
      let data = await pool.query({
        text: "SELECT * FROM categories WHERE name=$1",
        values: [value],
      });
      return data.rowCount !== 0;
    }),
  query("place")
    .optional({ checkFalsy: true })
    .custom(async (value) => {
      let data = await pool.query({
        text: "SELECT * FROM places WHERE name=$1",
        values: [value],
      });
      return data.rowCount !== 0;
    }),
];

const getAds = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).end();
    }

    let data = await pool.query({
      text: `SELECT ad_uuid, created_at, title, description, price::numeric, category_uuid, user_uuid, encode(image, 'base64') as image, image_type, place_uuid, fullname, phone_number 
          FROM ads
          JOIN users USING(user_uuid) 
          JOIN categories USING(category_uuid)
          JOIN places USING(place_uuid)
          WHERE categories.name ILIKE COALESCE($1, '%') AND places.name ILIKE COALESCE($2, '%')`,
      values: [req.query.category, req.query.place],
    });

    return res.status(200).json(data.rows);
  } catch (e) {
    return res.status(500).end();
  }
};

module.exports = {
  adsValidation,
  getAds,
};

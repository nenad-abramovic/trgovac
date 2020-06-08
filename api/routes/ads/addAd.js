const { header, body, validationResult } = require("express-validator");
const pool = require("../../db");
const { verifyToken } = require("../../utilities/token");

const addAdValidator = [
  header("Authorization").exists(),
  body("title").isLength({ min: 1 }),
  body("description").isLength({ min: 1 }),
  body("price")
    .isNumeric()
    .custom((value) => value >= 1),
  body("categoryUUID").isUUID(),
  body("image").optional({ checkFalsy: true }),
];

const addAd = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).end();
    }

    let email = verifyToken(req.header("Authorization").split(" ")[1]);
    if (!email) {
      return res.status(401).end();
    }

    let userData = await pool.query({
      text: "SELECT user_uuid FROM users WHERE email=$1",
      values: [email],
    });
    if (userData.rowCount === 0) {
      return res.status(401).end();
    }

    if (!userData.rows[0].fullname || !userData.rows[0].place_uuid) {
      return res.status(403).end();
    }

    console.log("aaaa", req.body.image);

    let data = await pool.query({
      text: `INSERT INTO ads(title, description, price, category_uuid, user_uuid, image) 
            VALUES($1, $2, $3::money, $4, $5, decode($6, 'base64')) RETURNING ad_uuid`,
      values: [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.categoryUUID,
        userData.rows[0].user_uuid,
        Buffer.from(req.body.image.toString()).toString("base64"),
      ],
    });

    data = await pool.query({
      text: `SELECT ad_uuid, created_at, title, description, price::numeric, category_uuid, user_uuid, encode(image, 'base64') as image, place_uuid, fullname, phone_number 
        FROM ads
        JOIN users USING(user_uuid) 
        JOIN categories USING(category_uuid)
        JOIN places USING(place_uuid)
        WHERE ad_uuid=$1`,
      values: [data.rows[0].ad_uuid],
    });

    return res.status(201).json(data.rows[0]);
  } catch (e) {
    return res.status(500).end();
  }
};

module.exports = {
  addAdValidator,
  addAd,
};

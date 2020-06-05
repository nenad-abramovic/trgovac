const { header, body, validationResult } = require("express-validator");
const pool = require("../../db");
const { verifyToken } = require("../../utilities/token");

const addAdValidator = [
  header("Authorization", "Токен није испоручен.").exists(),
  body("title", "Наслов огласа није испоручен.").isLength({ min: 1 }),
  body("description", "Опис огласа није испоручен.").isLength({ min: 1 }),
  body("price", "Износ није испоручен.").isNumeric(),
  body("categoryUUID", "Категорија огласа није испоручена.").exists(),
  body("image", "Слика није испоручена.").optional(),
];

const addAd = async (req, res, next) => {
  try {
    let email = verifyToken(req.headers.authorization.split(" ")[1]);
    let errors = validationResult(req);

    if (!(errors.isEmpty() && email)) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    let userData = await pool.query({
      text: "SELECT user_uuid FROM users WHERE email=$1",
      values: [email],
    });

    await pool.query({
      text: `INSERT INTO ads(title, description, price, category_uuid, user_uuid, image) 
            VALUES($1, $2, $3::numeric::money, $4, $5, decode($6, 'base64'))`,
      values: [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.categoryUUID,
        userData.rows[0].user_uuid,
        Buffer.from(req.body.image.toString()).toString("base64"),
      ],
    });

    return res.status(201).json({
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      errors: e,
    });
  }
};

module.exports = {
  addAdValidator,
  addAd,
};

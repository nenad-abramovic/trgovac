const pool = require("../../db");
const { verifyToken } = require("../../utilities/token");
const { header, body, validationResult } = require("express-validator");

const newCommentValidation = [
  header("Authorization", "Токен није испоручен.").exists(),
  body("text", "Тело коментара није испоручено.").isLength({ min: 1 }),
  body("adUUID", "Оглас није испоручен.").isUUID(),
];

const commentAd = async (req, res, next) => {
  try {
    let email = verifyToken(req.header.Authorization.split(" ")[1]);
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
      text: "INSERT INTO comments(text, user_uuid, ad_uuid) VALUES($1, $2, $3)",
      values: [req.body.text, userData?.rows[0]?.user_uuid, req.body.ad_uuid],
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
  newCommentValidation,
  commentAd,
};

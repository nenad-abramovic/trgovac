const pool = require("../../db");
const { verifyToken } = require("../../utilities/token");
const { header, body, validationResult } = require("express-validator");

const newCommentValidation = [
  header("Authorization", "Токен није испоручен.").exists(),
  body("text", "Тело коментара није испоручено.").isLength({ min: 1 }),
  body("adUUID", "Оглас није испоручен.").isUUID(),
];

const commentAd = async (req, res) => {
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

    await pool.query({
      text: "INSERT INTO comments(text, user_uuid, ad_uuid) VALUES($1, $2, $3)",
      values: [req.body.text, userData.rows[0].user_uuid, req.body.adUUID],
    });

    return res.status(201).end();
  } catch (e) {
    return res.status(500).end();
  }
};

module.exports = {
  newCommentValidation,
  commentAd,
};

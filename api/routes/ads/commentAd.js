const pool = require("../../db");
const { header, body, validationResult } = require("express-validator");

const newCommentValidation = [
  header("Authorization", "Токен није испоручен.").exists(),
  body("text", "Тело коментара није испоручено.").exists(),
  body("adUUID", "Оглас није испоручен.").isUUID(),
];

const commentAd = async (req, res, next) => {
  console.log("f");
  try {
    console.log("g");
    let email = verifyToken(req.header["Authorization"].split(" ")[1]);
    console.log("h");
    let errors = validationResult(req);
    console.log("a");
    if (!(errors.isEmpty() && email)) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    console.log("b");

    let userData = await pool.query({
      text: "SELECT user_uuid FROM users WHERE email=$1",
      values: [email],
    });
    console.log("c");

    await pool.query({
      text: "INSERT INTO comments(text, user_uuid, ad_uuid) VALUES($1, $2, $3)",
      values: [req.body.text, userData.rows[0].user_uuid, req.body.ad_uuid],
    });
    console.log("d");

    return res.status(201).json({
      success: true,
    });
  } catch (e) {
    console.log("e");
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

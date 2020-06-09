const pool = require("../../db");
const { verifyToken } = require("../../utilities/token");
const { header, body, validationResult } = require("express-validator");

const newCommentValidation = [
  header("Authorization").exists(),
  body("text").isLength({ min: 1 }),
  body("adUUID").isUUID(),
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
      text: "SELECT user_uuid, fullname, place_uuid FROM users WHERE email=$1",
      values: [email],
    });
    if (userData.rowCount === 0) {
      return res.status(401).end();
    }

    if (!userData.rows[0].fullname || !userData.rows[0].place_uuid) {
      return res.status(403).end();
    }

    await pool.query({
      text: "INSERT INTO comments(text, user_uuid, ad_uuid) VALUES($1, $2, $3)",
      values: [req.body.text, userData.rows[0].user_uuid, req.body.adUUID],
    });

    let data = await pool.query({
      text:
        "SELECT text, created_at, fullname, user_uuid FROM comments JOIN users USING(user_uuid) WHERE ad_uuid=$1",
      values: [req.body.adUUID],
    });
    return res.status(201).json(data.rows);
  } catch (e) {
    return res.status(500).end();
  }
};

module.exports = {
  newCommentValidation,
  commentAd,
};

const pool = require("../../db");
const { header, body, validationResult } = require("express-validator");
const { verifyToken } = require("../../utilities/token");

const deleteAdValidation = [
  header("Authorization").exists(),
  body("adUUID").isUUID(),
];

const deleteAd = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).end();
    }

    let email = verifyToken(req.header("Authorization").split(" ")[1]);
    if (!email) {
      return res.status(401).end();
    }
    console.log("aaa");
    await pool.query({
      text:
        "DELETE ads FROM ads JOIN users USING(user_uuid) WHERE ad_uuid=$1 AND email=$2",
      values: [req.body.adUUID, email],
    });
    console.log("bbb");

    return res.status(200).end();
  } catch (e) {
    return res.status(500).end();
  }
};

module.exports = {
  deleteAdValidation,
  deleteAd,
};

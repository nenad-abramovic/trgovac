const pool = require("../../db");
const { param, validationResult } = require("express-validator");

const commentsValidation = [param("ad_uuid", "Није прослеђен оглас.").exists()];

const getComments = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).end();
    }

    let data = await pool.query({
      text:
        "SELECT text, created_at, fullname, user_uuid FROM comments JOIN users USING(user_uuid) WHERE ad_uuid=$1",
      values: [req.params.ad_uuid],
    });
    return res.status(200).json(data.rows);
  } catch (e) {
    return res.status(500).end();
  }
};

module.exports = {
  commentsValidation,
  getComments,
};

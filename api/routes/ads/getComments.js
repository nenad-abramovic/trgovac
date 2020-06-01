const pool = require("../../db");
const { param, validationResult } = require("express-validator");

const commentsValidation = [param("adUUID", "Није прослеђен оглас.").exists()];

const getComments = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    let data = await pool.query({
      text:
        "SELECT text, created_at, fullname, user_uuid FROM comments JOIN users USING(user_uuid) WHERE ad_uuid=$1",
      values: [req.param.adUUID],
    });

    return res.status(200).json({
      success: true,
      ...data.rows,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      errors: e,
    });
  }
};

module.exports = {
  commentsValidation,
  getComments,
};

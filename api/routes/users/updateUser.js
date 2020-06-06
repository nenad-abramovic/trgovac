const { header, body, validationResult } = require("express-validator");
const pool = require("../../db");
const { verifyToken } = require("../../utilities/token");

const updateUserValidation = [
  header("Authorization").exists(),
  body("fullname").matches(/^.{3,}$/),
  body("placeUUID").isUUID(),
  body("phoneNumber").optional({ checkFalsy: true }).isMobilePhone("sr-RS"),
];

const updateUser = async (req, res) => {
  try {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).end();
    }

    let email = verifyToken(req.header("Authorization").split(" ")[1]);
    if (!email) {
      return res.status(401).end();
    }

    let data = await pool.query({
      text:
        "UPDATE users SET fullname=$1, place_uuid=$2, phone_number=$3 WHERE email=$4 RETURNING *",
      values: [
        req.body.fullname,
        req.body.placeUUID,
        req.body.phoneNumber,
        email,
      ],
    });

    let userData = data.rows[0];
    delete userData.password;
    userData.token = req.header("Authorization").split(" ")[1];

    return res.status(200).json(userData);
  } catch (e) {
    return res.status(500).end();
  }
};

module.exports = {
  updateUserValidation,
  updateUser,
};

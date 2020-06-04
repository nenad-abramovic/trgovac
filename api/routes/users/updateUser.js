const { header, body, validationResult } = require("express-validator");
const pool = require("../../db");
const { verifyToken } = require("../../utilities/token");

const updateUserValidation = [
  header("Authorization", "Токен није испоручен.").exists(),
  body("fullname", "Име је неисправно.").matches(/^.{3,}$/),
  body("placeUUID", "Место пребивалишта је неисправно.").isUUID(),
  body("phoneNumber", "Број телефона је неисправан")
    .optional({ checkFalsy: true })
    .isMobilePhone("sr-RS"),
];

const updateUser = async (req, res, next) => {
  try {
    console.log("saddsada", req.header("Authorization"));
    let email = verifyToken(req.header("Authorization").split(" ")[1]);
    let errors = validationResult(req);

    if (!(errors.isEmpty() && email)) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    console.log("aaa", email);
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
    console.log(data.rows);
    return res.status(200).json({
      success: true,
      ...data.rows[0],
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      errors: e,
    });
  }
};

module.exports = {
  updateUserValidation,
  updateUser,
};

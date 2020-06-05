const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.get("/", async (req, res, next) => {
  try {
    let data = await pool.query("SELECT * FROM categories");

    return res.status(200).json({
      success: true,
      data: data.rows,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      errors: e,
    });
  }
});

module.exports = router;

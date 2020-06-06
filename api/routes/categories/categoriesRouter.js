const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.get("/", async (req, res) => {
  try {
    let data = await pool.query("SELECT * FROM categories");
    return res.status(200).json(data.rows);
  } catch (e) {
    return res.status(500).end();
  }
});

module.exports = router;

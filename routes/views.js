const express = require("express")

const router = express.Router()

router.get("/", (req, res, next) =>
  res.json({ name: "mecha2k", email: "mecha2k@naver.com" }))

module.exports = { router }

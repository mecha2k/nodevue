const express = require("express")
const router = express.Router()

const viewcontrol = require("../controls/views")
const authcontrol = require("../controls/authorize")

router.get("/", viewcontrol.getViews)
router.get("/views", authcontrol.isLoggedIn, viewcontrol.getViews)

module.exports = router
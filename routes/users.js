const express = require("express")
const router = express.Router()

const usercontrol = require("../controls/users")
const authcontrol = require("../controls/authorize")

router.post("/signup", authcontrol.signup)
router.post("/signin", authcontrol.login)
router.get("/logout", authcontrol.logout)

router.use(authcontrol.protect)

router.post("/forgotpass", authcontrol.forgotPassword)

router.use(authcontrol.restrictTo("admin"))

router.route("/").get(usercontrol.getallUsers).post(usercontrol.createUser)

module.exports = router

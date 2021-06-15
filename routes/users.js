const express = require("express")
const router = express.Router()

const usercontrol = require("../controls/users")
const authcontrol = require("../controls/authorize")

router.post("/signup", authcontrol.signup)
router.post("/signin", authcontrol.signin)

// router.post("/login", authControl.login)
// router.get("/logout", authControl.logout)

// router.post("/forgotPassword", authControl.forgotPassword)
// router.patch("/resetPassword/:token", authControl.resetPassword)

// router.use(authControl.protect)

// router.patch("/updateMyPassword", authControl.updatePassword)
// router.get("/me", userControl.getMe, userControl.getUser)
// router.patch(
//   "/updateMe",
//   userControl.uploadUserPhoto,
//   userControl.resizeUserPhoto,
//   userControl.updateMe
// )
// router.delete("/deleteMe", userControl.deleteMe)

// router.use(authControl.restrictTo("admin"))

// router.route("/").get(userControl.getAllUsers).post(userControl.createUser)

// router
//   .route("/:id")
//   .get(userControl.getUser)
//   .patch(userControl.updateUser)
//   .delete(userControl.deleteUser)

module.exports = router

const express = require("express")
const router = express.Router()

const surveycontrol = require("../controls/surveys")
const authcontrol = require("../controls/authorize")

router.get("/", surveycontrol.getsurveyList)
router.route("/:id").get(surveycontrol.getSurvey).put(surveycontrol.setSurvey)

router.use(authcontrol.protect)

router.use(authcontrol.restrictTo("admin"))

module.exports = router

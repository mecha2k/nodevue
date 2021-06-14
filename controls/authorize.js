const crypto = require("crypto")
const { promisify } = require("util")
const jwt = require("jsonwebtoken")

const createToken = function (id) {
  return jwt.sign({ id }, process.env["JWT_HASHCODE"], {
    expiresIn: process.env["JWT_EXPIRES_IN"]
  })
}

const saveTokenInCookie = function (user, status, res) {
  const token = createToken(user._id)
  const cookieOptions = {
    expires: new Date(Date.now() + process.env["JWT_COOKIE_EXPIRES_IN"] * 24 * 60 * 60 * 1000),
    httpOnly: true
  }
  if (process.env["NODE_ENV"] === "production") cookieOptions.secure = true

  res.cookie("jwt", token, cookieOptions)
  user.password = undefined

  res.status(status).json({ status: "success", token, data: { user } })

  return token
}

exports.signup = async function (req, res, next) {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role
    })

    saveTokenInCookie(newUser, 201, res)
  } catch (error) {
    res.status(404).json({ status: "fail", message: error })
  }
}

const crypto = require("crypto")
const bcrypt = require("bcrypt")
const { promisify } = require("util")
const jwt = require("jsonwebtoken")

const pool = require("./database")
const apperr = require("./apperror")

const createToken = function (email) {
  return jwt.sign({ email }, process.env["JWT_HASHCODE"], {
    expiresIn: process.env["JWT_EXPIRES_IN"]
  })
}

const saveTokenInCookie = function (user, status, res) {
  const token = createToken(user.email)
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
  let password = req.body.password
  if (password !== req.body.passwordConfirm)
    return res.status(406).json({ status: "fail", message: "passwords are not the same!" })
  password = await bcrypt.hash(password, 12)

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: password,
    phone: req.body.phone
  }
  console.log(user)

  try {
    const sql = "INSERT INTO users(name, email, password, phone) VALUES(?, ?, ?, ?)"
    pool.query(sql, [user.name, user.email, user.password, user.phone], (err, rows, fields) => {
      if (err) res.status(404).json({ status: "fail", message: err })
      else saveTokenInCookie(user, 201, res)
    })
  } catch (err) {
    res.status(404).json({ status: "fail", message: err })
  }
}

exports.login = async function (req, res, next) {
  try {
    const { email, password } = req.body
    if (!email || !password) return next(new apperr("Please provide email and password!", 400))

    const sql = "SELECT * FROM users WHERE email = ?"
    pool.query(sql, [email], (err, rows, fields) => {
      if (err) res.status(404).json({ status: "fail", message: err })
      else {
        const check = bcrypt.compareSync(password, rows[0].password)
        if (!rows[0] || !check) return next(new apperr("Incorrect email or password", 401))
        saveTokenInCookie(rows[0], 201, res)
      }
    })
  } catch (error) {
    res.status(404).json({ status: "fail", message: error })
  }
}

exports.forgotPassword = async function (req, res, next) {
  res.status(200).json({ status: "success", message: "Token sent to email!" })
}

exports.protect = async function (req, res, next) {
  try {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
      token = req.headers.authorization.split(" ")[1]
    else if (req.cookies.jwt) token = req.cookies.jwt
    else token = undefined
    if (!token) return next(new apperr("You are not logged in! Please log in to get access.", 401))

    const decoded = await promisify(jwt.verify)(token, process.env["JWT_HASHCODE"])
    const sql = "SELECT * FROM users WHERE email = ?"
    pool.query(sql, [decoded.email], (err, rows, fields) => {
      if (err) res.status(404).json({ status: "fail", message: err })
      else {
        if (!rows[0])
          return next(new apperr("The user belonging to this token does no longer exist.", 401))
        // if (currentUser.changedPasswd(decoded.iat))
        //   return next(new apperr("User recently changed password! Please log in again.", 401))
        req.user = rows[0]
        res.locals.user = rows[0]
      }
    })
  } catch (err) {
    res.status(404).json({ status: "fail", message: err })
  }

  next()
}

exports.isLoggedIn = async function (req, res, next) {
  if (req.cookies["jwt"]) {
    try {
      const decoded = await promisify(jwt.verify)(req.cookies["jwt"], process.env["JWT_HASHCODE"])
      console.log("JWT decoding : ", decoded)
      const sql = "SELECT * FROM users WHERE email = ?"
      pool.query(sql, [decoded.email], (err, rows, fields) => {
        if (err) res.status(404).json({ status: "fail", message: err })
        else {
          if (!rows[0]) return next(new apperr("Incorrect token!", 401))
          // if (currentUser.changedPasswd(decoded.iat)) return next()
          res.locals.user = rows[0]
          console.log(rows[0])
        }
      })
    } catch (error) {
      res.status(404).json({ status: "fail", message: err })
    }
  } else return next(new apperr("You are not logged in! Please log in to get access.",401))
  
  next()
}

exports.restrictTo = function (...roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next(new appError("You do not have permission to perform this action", 403))
    }
    next()
  }
}

exports.logout = function (req, res) {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })
  res.status(200).json({ status: "success" })
}

const pool = require("./database")

exports.getsurveyList = async function (req, res, next) {
  try {
    let sql = "SELECT * FROM survey LIMIT 10"
    pool.query(sql, (err, rows, fields) => {
      if (err) res.status(404).json({ status: "sql query fail", message: err })
      else res.status(200).json(rows)
    })
  } catch (err) {
    res.status(404).json({ status: "sql query fail", message: err })
  }
}

exports.getSurvey = async function (req, res, next) {
  try {
    let id = req.params.id
    let sql = "SELECT * FROM survey WHERE id = ?"
    pool.query(sql, [id], (err, rows, fields) => {
      if (err) res.status(404).json({ status: "sql query fail", message: err })
      else res.status(200).json(rows)
    })
  } catch (err) {
    res.status(404).json({ status: "sql query fail", message: err })
  }
}

exports.setSurvey = async function (req, res, next) {
  try {
    let id = req.params.id
    let title = req.body.title
    let state = req.body.state
    let sql = "UPDATE survey SET title = ?, state = ? WHERE id = ?"
    pool.query(sql, [title, state, id], (err, rows, fields) => {
      if (err) res.status(404).json({ status: "sql query fail", message: err })
      else res.status(200).json(rows)
    })
  } catch (err) {
    res.status(404).json({ status: "sql query fail", message: err })
  }
}

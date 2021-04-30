const mydb = require("./db_async")

mydb.simpleQuery(function (conn) {
  sql = "SELECT * FROM Club"
  conn.query(sql, (err, results, fields) => results.forEach((rows) => console.log(rows)))
})

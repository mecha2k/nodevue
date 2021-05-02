const mydb = require("./db_async")

mydb.simpleQuery(function (conn) {
  sql = "SELECT * FROM Club"
  conn.query(sql, (err, results, fields) => {
    if (err) throw err
    results.forEach((rows) => console.log(rows))
    conn.end()
  })
})

module.exports = (app, pool) => {
  app.get("/", (req, res) => {
    const fs = require("fs")
    const data = fs.readFileSync("./exercise/test.json", "utf-8")
    console.log(data)
    console.log(__dirname)
    let data1 = JSON.stringify(require("./exercise/test.json"))
    // res.json(data1)
    // res.send('Hello node.vue')
    // res.render('index', {name: 'mecha2k1'})
    res.render("index")
  })

  // http://localhost:3000/test/aaaA@naver.com?nid=123
  // req.body, req.query (url)
  app.get("/test/:email", (req, res) => {
    let email = req.params.email
    let nid = req.query.nid
    res.send(email + ", id no is " + nid)
  })

  app.get("/dbtest", (req, res) => {
    let sql = "SELECT * FROM Club"
    pool.query(sql, (err, rows, fields) => res.json(rows))
  })

  app.use("/api/school/:addr", (req, res) => {
    let addr = req.params.addr
    let sql = "SELECT * FROM Student WHERE address = ? LIMIT 3"
    pool.query(sql, [addr], (err, rows, fields) => res.json(rows))
  })
}

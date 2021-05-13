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

  app.get("/api/school/:addr", (req, res) => {
    let addr = req.params.addr
    let sql = "SELECT * FROM Student WHERE address = ? LIMIT 3"
    pool.query(sql, [addr], (err, rows, fields) => res.json(rows))
  })

  app.put("/api/school/:addr/:id", (req, res) => {
    let id = req.params.id
    let phone = req.body.phone
    let sql = "UPDATE student SET phone = ? WHERE id = ?"
    pool.query(sql, [phone, id], (err, rows, fields) => {
      if (err) console.log(err)
      res.json(rows)
    })
  })

  app.get("/api/surveys", (req, res) => {
    let sql = "SELECT * FROM survey LIMIT 2"
    pool.query(sql, (err, rows, fields) => {
      if (err) throw err
      res.json(rows)
    })
  })

  app.get("/api/surveys/:id", (req, res) => {
    let id = req.params.id
    let sql = "SELECT * FROM survey WHERE id = ?"
    pool.query(sql, [id], (err, rows, fields) => {
      if (err) throw err
      res.json(rows[0])
    })
  })

  app.put("/api/surveys/:id", (req, res) => {
    let id = req.params.id
    let title = req.body.title
    let state = req.body.state
    let sql = "UPDATE survey SET title = ?, state = ? WHERE id = ?"
    pool.query(sql, [title, state, id], (err, rows, fields) => {
      if (err) throw err
      res.json(rows.affectedRows)
    })
  })

  app.post("/api/surveys", (req, res) => {
    let title = req.body.title
    let state = req.body.state
    let sql = "INSERT INTO survey(title, state) VALUES(?, 0)"
    pool.query(sql, [title, state, id], (err, rows, fields) => {
      if (err) throw err
      res.json(rows.affectedRows)
    })
  })
}

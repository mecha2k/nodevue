const bcrypt = require("bcrypt")

const dotenv = require("dotenv")
dotenv.config({ path: "../../.env" })

const crypt = require("../../controls/encrypt")
const pools = require("../../controls/database")

console.log(__dirname)

const enc = crypt.encrypt("nodeJS")
console.log("encrypt: ", enc)
console.log("decrypt: ", crypt.decrypt(enc))
console.log("sha256: ", crypt.sha256("nodeJS"))

const map = crypt.hsmap("key", "name")
console.log("hashmap: ", map.get("key"))

const bcryptfunc = async () => {
  let password = "test123"
  password = await bcrypt.hash(password, 12)
  console.log(password)

  const check = await bcrypt.compare("test123", password)
  console.log(check)
}

bcryptfunc()

// crypt.ogsinfo("https://naver.com", (err, res) => console.log(err, res))

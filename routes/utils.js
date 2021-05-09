const ogs = require("open-graph-scraper")
const crypto = require("crypto-js")
const hashmap = require("hashmap")
const dotenv = require("dotenv")

dotenv.config()
encKey = process.env.ENCRYPT_KEY
console.log("encrypt Key: ", encKey)

const ogsinfo = (url, func) => ogs({ url: url }, (err, res) => func(err, res))
const encrypt = (data, key) => crypto.AES.encrypt(data, key || encKey).toString()
const decrypt = (data, key) => crypto.AES.decrypt(data, key || encKey).toString(crypto.enc.Utf8)
const sha256 = (data, key) => crypto.SHA256(data + (key || encKey)).toString()
const hsmap = (key, data) => {
  const map = new hashmap()
  map.set(key, data)
  console.log('hashmap: ', map.get(key))
  return map
}

module.exports = { ogsinfo, encrypt, decrypt, sha256, hsmap }

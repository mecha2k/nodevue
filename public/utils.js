const ogs = require("open-graph-scraper")
const crypto = require("crypto-js")
const hashmap = require("hashmap")
const sha256 = require("crypto-js/sha256")
const dotenv = require("dotenv")

dotenv.config({ path: "../.env" })
encKey = process.env.ENCRYPT_KEY
console.log("encrypt Key: ", encKey)

const ogsinfo = (url, func) => ogs({ url: url }, (err, res) => func(err, res))
const encrypt = (data, key) => crypto.AES.encrypt(data, key || encKey).toString()
const decrypt = (data, key) => crypto.AES.decrypt(data, key || encKey).toString(crypto.enc.Utf8)

module.exports = { ogsinfo, encrypt, decrypt }

export const utils = {
  created() {
    this.crypto = require("crypto-js")
    this.hashmap = require("hashmap")
  },
  data() {
    return {
      crypto: null,
      hashmap: null,
      encKey: "nodevue_mecha2k"
    }
  },
  methods: {
    encrypt(data, key) {
      return this.crypto.AES.encrypt(data, key || this.encKey).toString()
    },
    decrypt(data, key) {
      return this.crypto.AES.decrypt(data, key || this.encKey).toString(this.crypto.enc.Utf8)
    },
    sha256(data, key) {
      return this.crypto.SHA256(data + (key || this.encKey)).toString()
    },
    hsmap(key, data) {
      let map = new this.hashmap()
      map.set(key, data)
      console.log("hashmap: ", map.get(key))
      return map
    }
  }
}

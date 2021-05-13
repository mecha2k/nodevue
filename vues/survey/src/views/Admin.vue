<template>
  <div>
    <h2 class="text-center">Admin template</h2>
    <hr>
    <p>Encrypt of "nodeJS" : {{ makeEncrypt("nodeJS") }}</p>
    <p>Decrypt : {{ this.decrypt(this.encrypt("nodeJS")) }}</p>
    <p>Sha256 of "nodeJS" : {{ this.sha256("nodeJS") }}</p>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {}
  },
  methods: {
    makeEncrypt(value) {
      const enc = this.encrypt(value)
      console.log("encrypt: ", enc)
      console.log("decrypt: ", this.decrypt(enc))
      return enc
    }
  }
}
</script>

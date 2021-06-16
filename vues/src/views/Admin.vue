<template>
  <div>
    <div v-if="!isAdmin" class="my-5">
      <div class="form-floating w-50">
        <input type="password" class="form-control" id="adminKey" v-model="adminKey" />
        <label for="adminKey"><i class="fas fa-key"></i> Admin Key</label>
      </div>
      <label class="visually-hidden" for="autoSizingInputGroup">Username</label>
    </div>
    <h2 class="text-center">Admin template</h2>
    <hr />
    <p>Encrypt of "nodeJS" : {{ makeEncrypt("nodeJS") }}</p>
    <p>Decrypt : {{ this.decrypt(this.encrypt("nodeJS")) }}</p>
    <p>Sha256 of "nodeJS" : {{ this.sha256("nodeJS") }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  beforeCreate() {
    if (this.isAdmin) this.$router.replace("/surveylist")
    else console.log("administration failed...")
  },
  created() {
    this.$watch("adminKey", this.lodash.debounce(this.checkAdminKey, 1000))
  },
  data() {
    return {
      adminKey: ""
    }
  },
  computed: {
    ...mapState(["isAdmin"])
  },
  methods: {
    checkAdminKey() {
      console.log(this.adminKey)
      this.axios.post(this.apiUrl + "/api/adminkey", { key: this.adminKey }).then((res) => {
        if (res.status === 200) {
          // this.$store.dispatch("approveAdmin")
          this.$router.push({ name: "SurveyList" })
          console.log("admin approved! ", res)
        } else {
          console.log("something is wrong...")
        }
      })
    },
    makeEncrypt(value) {
      const enc = this.encrypt(value)
      console.log("encrypt: ", enc)
      console.log("decrypt: ", this.decrypt(enc))
      return enc
    }
  }
}
</script>

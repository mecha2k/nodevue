<template>
  <div>
    <h3>Hi Sister... {{ msg }}</h3>
    <input type="text" v-model="mymsg" />
    <button @click="sendMessage()">SendMessage</button>
  </div>
</template>

<script>
export default {
  setup() {},
  created() {
    this.mymsg = this.msg
    console.log("sister.created...")
    this.eventBus.on("fromBro", (res) => {
      console.log("sister emit message >>", res)
      this.mymsg = res
    })
  },
  data() {
    return {
      mymsg: "welcome (from sister)"
    }
  },
  props: ["msg"],
  methods: {
    sendMessage() {
      this.eventBus.emit("fromSis", this.mymsg)
    }
  }
}
</script>

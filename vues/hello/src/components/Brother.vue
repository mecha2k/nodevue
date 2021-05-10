<template>
  <div>
    <h3>Hi Brother... {{ msg }}</h3>
    <input type="text" v-model="mymsg" />
    <button @click="sendMessage()">SendMessage</button>
  </div>
</template>

<script>
export default {
  setup() {},
  created() {
    this.mymsg = this.msg
    console.log("brother.created...")
    this.eventBus.on("fromSis", (res) => {
      console.log("sister emit message >>", res)
      this.mymsg = res
    })
  },
  data() {
    return {
      mymsg: ""
    }
  },
  props: ["msg"],
  methods: {
    sendMessage() {
      console.log("brother is sending message...")
      this.eventBus.emit("fromBro", this.mymsg)
    }
  }
}
</script>

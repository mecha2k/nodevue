<template>
  <div class="home">
    <h3>
      <span v-once>{{ nameTag }}</span>
      <span v-if="isVisible">:: {{ visit }}</span>
    </h3>
    <h3>{{ propVisit }}</h3>
    <input type="text" @keyup="visit++" v-model="nameTag" />
    <button @click="visitCount()">visit count</button>
    <span v-html="nameTag"></span>
    <hr />
    <button v-bind:disabled="isDisabled">Disabled</button>
    <TodoItem msg="Parent 'Home' message props." />
    <hr />
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"
import TodoItem from "@/components/TodoItem.vue"

export default {
  name: "Home",
  components: {
    HelloWorld,
    TodoItem
  },
  data() {
    return {
      nameTag: "<strong style='color: red;'>홍길동</strong>",
      visit: 0,
      isVisible: false,
      isDisabled: false
    }
  },
  methods: {
    visitCount() {
      this.visit++
      this.isVisible = !this.isVisible
      this.isDisabled = !this.isDisabled
    }
  },
  computed: {
    propVisit() {
      return `Hi~ ${this.name}, you are ${this.visit} times visited.`
    }
  }
}
</script>

<template>
  <div class="home">
    <ul>
      <li v-for="res in responses.data" :key="res.id">{{ res }}</li>
    </ul>
    <h3>
      <span v-once>{{ nameTag }}</span>
      <span v-if="isVisible">:: {{ visit }}</span>
    </h3>
    <h3>{{ propVisit }}</h3>
    <input type="text" @keyup="visit++" v-model.trim="nameTag" />
    <button @click="visitCount()">visit count</button>
    <span v-html="nameTag"></span>
    <div>
      <a href="#" @click.prevent="handleRef('parent')"
        >preventDefault usage (parent)
        <span @click.stop="handleRef('child')">child usage</span>
      </a>
    </div>
    <hr />
    <button v-bind:disabled="isDisabled">Disabled</button>
    <!-- <TodoItem msg="Parent 'Home' message props." /> -->
    <TodoItem
      msg="Parent 'Home' message props."
      v-for="item in fruitLists"
      :fruit="item"
      :key="item.id"
    />

    <div style="color: blue">{{ reversedMsg }}</div>
    <button v-bind:class="{ red: isDisabled }">class field condition</button>
    <div v-bind:class="[isVisible ? activeClass : errorClass]">조건부 토글, 삼향 연산자</div>
    <div v-bind:style="{ color: styleColor, 'font-size': styleFontSize + 'px' }">
      스타일 객체 구문
      <span v-if="isVisible">v-if 구문</span>
      <span v-else>v-else 구문</span>
    </div>
    <hr />
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld v-if="isVisible" msg="Welcome to Your Vue.js App" />
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
  created() {
    this.fetchData()
  },
  data() {
    return {
      nameTag: "<strong style='color: red;'>홍길동</strong>",
      visit: 0,
      isVisible: false,
      isDisabled: false,
      activeClass: "active",
      errorClass: "text-danger",
      styleColor: "green",
      styleFontSize: 32,
      fruitLists: [
        { id: 0, item: "🍏" },
        { id: 1, item: "🍉🍏" },
        { id: 2, item: "🍇" },
        { id: 3, item: "🫐" },
        { id: 4, item: "🥬" },
        { id: 5, item: "🍆" }
      ],
      nameLists: [
        {
          firstName: "John",
          lastName: "Doe",
          age: 30
        },
        {
          firstName: "Tarry",
          lastName: "Kim",
          age: 24
        },
        {
          firstName: "JooYoun",
          lastName: "Kim",
          age: 36
        }
      ],
      responses: []
    }
  },
  methods: {
    visitCount() {
      this.visit++
      this.isVisible = !this.isVisible
      this.isDisabled = !this.isDisabled
    },
    handleRef(idTag) {
      console.log("preventDefault(), " + idTag)
    },
    fetchData() {
      this.axios.get("http://localhost:3000/api/school/서울").then((res) => {
        console.log("replies.data >>", res)
        this.responses = res
      })
    }
  },
  computed: {
    propVisit: function () {
      return `Hi~ ${this.nameTag}, you are ${this.visit} times visited.`
    },
    reversedMsg: function () {
      return this.nameTag.split("").reverse().join("")
    }
  }
}
</script>
<style scoped>
.red {
  color: red;
}

.text-danger {
  color: blueviolet;
  font-weight: bold;
  font-size: 18px;
}

.active {
  color: red;
  font-size: 32px;
}
</style>

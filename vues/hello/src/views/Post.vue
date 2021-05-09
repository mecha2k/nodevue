<template>
  <div>
    <h1>This is Post1...id {{ $route.params.id }}</h1>
    <div>title</div>
    <div>content</div>
  </div>
</template>

<script>
export default {
  setup() {},
  created() {
    console.log(
      "post child routing : ",
      this.$route.fullPath,
      this.$route.params,
      this.$route.query
    )
    this.id = this.$route.params.id
  },
  data() {
    return {
      id: 0,
      posts: [
        { id: 1, title: "1번 글입니다." },
        { id: 2, title: "2번 글입니다." },
        { id: 3, title: "3번 글입니다." }
      ]
    }
  },
  watch: {
    $route: {
      handler: "watchHandler",
      immediate: true
    }
  },
  methods: {
    watchHandler(route) {
      console.log("watchHandler :", route)
    }
  }
}
</script>

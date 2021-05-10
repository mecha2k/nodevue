<template>
  <div>
    <h1>This is Post Categories...</h1>
    <h3>게시글을 검색하세요.</h3>
    <h3>params: {{ params }}</h3>
    <h3>query: {{ $route.query }}</h3>
    <label for="post-id">검색어를 입력하세요.</label>
    <input type="text" id="post-id" v-model="postId" />
    <button @click="$router.push({ name: 'PostDetail', params: { id: postId } })">Search</button>
    <router-link :to="'/posts/' + postId"> LinkSearch </router-link>
    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.id }} :: {{ post.title }}
        <!-- <router-link to="/posts/post">{{ post.title }}</router-link>
        <router-link :to="'/posts/post/' + post.id">{{ post.title }}</router-link>
        <router-link :to="{ name: 'post', params: { id: post.id } }">{{ post.title }}</router-link> -->
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  setup() {},
  created() {
    console.log("route : ", this.$route)
    console.log("router : ", this.$router)
  },
  computed: {
    params() {
      return this.$route.params
    }
  },
  data() {
    return {
      posts: [
        { id: 1, title: "1번 글입니다." },
        { id: 2, title: "2번 글입니다." },
        { id: 3, title: "3번 글입니다." }
      ],
      postId: null
    }
  }
}
</script>

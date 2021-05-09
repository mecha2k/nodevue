<template>
  <div>
    <h1>This is Posts...</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="'/posts/post/' + post.id">{{ post.title }}</router-link>
        <!-- <router-link :to="{ name: 'post', params: { id: post.id } }">{{ post.title }}</router-link> -->
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  setup() {},
  data() {
    return {
      posts: [
        { id: 1, title: "1번 글입니다." },
        { id: 2, title: "2번 글입니다." },
        { id: 3, title: "3번 글입니다." }
      ]
    }
  }
}
</script>

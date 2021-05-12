<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header"><h3>User's lists</h3></div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="user in $store.state.allUsers" :key="user.id">
              {{ user.id }} :: {{ user.name }} :: {{ user.email }} :: {{ user.address }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-6">
        <Signup />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  mounted() {
    this.eventBus.on("signUp", (user) => this.$store.state.allUsers.push(user))
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

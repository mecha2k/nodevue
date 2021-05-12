<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">User's lists</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="user in allUsers" :key="user.id">
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
    this.eventBus.on("signUp", (user) => this.allUsers.push(user))
  },
  data() {
    return {
      allUsers: [
        {
          id: "hoza123",
          email: "hoza12@gmail.com",
          password: "123",
          name: "Hoza",
          address: "Seoul"
        },
        {
          id: "max123",
          email: "max12@gmail.com",
          password: "453",
          name: "Maxi",
          address: "Busan"
        },
        {
          id: "lego123",
          email: "lego12@gmail.com",
          password: "67889",
          name: "Lego",
          address: "Paris"
        }
      ]
    }
  },
  methods: {}
}
</script>

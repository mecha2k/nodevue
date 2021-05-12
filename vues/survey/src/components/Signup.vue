<template>
  <div class="card text-center">
    <div class="card-header">@CnLife.site</div>
    <div class="card-body">
      <img class="mb-4" src="../../public/img/cnlife-logo.png" alt="#" width="32px" />
      <h1 class="mb-3 h3 fw-normal">Sign in</h1>
      <div class="form-floating my-2">
        <input type="text" class="form-control" id="userId" v-model="userId" />
        <label for="userId">ID</label>
      </div>
      <div class="form-floating my-2">
        <input type="password" class="form-control" id="passwd" v-model="password" />
        <label for="passwd">Password</label>
      </div>
      <div class="form-floating my-2">
        <input type="email" class="form-control" id="email" v-model="email" />
        <label for="email">Email address</label>
      </div>
      <div class="form-floating my-2">
        <input type="text" class="form-control" id="userName" v-model="userName" />
        <label for="userName">Name</label>
      </div>
      <div class="form-floating my-2">
        <input type="text" class="form-control" id="address" v-model="address" />
        <label for="address">Address</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary mt-3" @click="signUp()">Sign up</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2019-2021</p>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  mounted() {},
  data() {
    return {
      userId: null,
      userName: null,
      password: null,
      email: null,
      address: null
    }
  },
  methods: {
    signUp() {
      let userObj = {
        id: this.userId,
        password: this.password,
        name: this.userName,
        email: this.email,
        address: this.address
      }
      console.log(userObj)
      this.eventBus.emit("signUp", userObj)
      this.clearForm()
    },
    clearForm() {
      this.userId = null
      this.password = null
      this.userName = null
      this.email = null
      this.address = null
    }
  }
}
</script>

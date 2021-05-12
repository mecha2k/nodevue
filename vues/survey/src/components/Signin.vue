<template>
  <div class="d-flex flex-row justify-content-center">
    <div class="col-md-6 m-lg-5">
      <div class="card text-center">
        <div class="card-header">@CnLife.site</div>
        <div class="card-body">
          <form>
            <img class="mb-4" src="../../public/img/cnlife-logo.png" alt="#" width="32px" />
            <h1 class="mb-3 h3 fw-normal">Sign in</h1>
            <div class="form-floating">
              <input type="email" class="form-control" id="email" placeholder="id@email.com" />
              <label for="email">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="password" placeholder="password" />
              <label for="password">Password</label>
            </div>
            <div class="checkbox m-3">
              <label><input type="checkbox" value="remember-me" /> Remember me</label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" @click="signIn()">Sign in</button>
            <p class="mt-5 mb3 text-muted">&copy; 2019-2021</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {}
  },
  methods: {
    signIn() {
      console.log("signup")
    }
  }
}
</script>

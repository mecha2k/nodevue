<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 mt-3">
        <h3>User's lists({{ count }})</h3>
        <h5>
          Seoul Users({{ $store.getters.countOfSeoul }}, {{ $store.getters.percentOfSeoul }}%)
        </h5>
        <div class="card" v-for="(user, index) in allUsers" :key="index">
          <div class="row">
            <div class="col-md-3 d-flex align-items-center justify-content-center">
              <img :src="user.src" class="img-fluid" width="60" alt="people" />
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <p class="card-text my-0">{{ user.name }}</p>
                <p class="card-text">
                  <small class="text-muted">id {{ user.id }} / {{ user.address }} 거주</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 mt-3">
        <Signup />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  created() {},
  mounted() {
    // this.eventBus.on("signUp", (user) => this.$store.state.allUsers.push(user))
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(["allUsers"]),
    ...mapGetters({
      count: "allUsersCount",
      seoul: "countOfSeoul",
      percent: "percentOfSeoul"
    })
    // ...mapGetters(["allUsersCount", "countOfSeoul"])
  },
  methods: {}
}
</script>

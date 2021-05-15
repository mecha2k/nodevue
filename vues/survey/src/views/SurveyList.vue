<template>
  <div class="row">
    <div class="col-4">
      <ul class="list-group">
        <div v-for="(survey, index) in surveys" :key="index">
          <router-link
            :to="'/surveylist/edit/' + survey.id"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            {{ survey.title }}
            <span class="badge bg-primary rounded-pill">
              {{ surveyState(survey.state) }}
            </span>
          </router-link>
        </div>
      </ul>
    </div>
    <div class="col-8">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  created() {
    if (!this.isAdmin) this.$router.replace({ name: "Admin" })

    this.axios.get(this.apiUrl + "surveys").then((res) => {
      if (res.status !== 200) {
        alert("Error on getting survey data !!")
        return
      }
      this.surveys = res.data
      console.log(res.data)
    })
  },
  data() {
    return {
      surveys: []
    }
  },
  computed: {
    ...mapState(["isAdmin"])
  },
  methods: {}
}
</script>

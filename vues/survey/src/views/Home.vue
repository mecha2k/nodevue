<template>
  <div>
    <section class="card bg-white fade-in">
      <div class=" card-body text-black text-center p-5 my-5">
        <h1 class="mb-4"><strong>Survey System</strong></h1>
        <p><strong>Best & free guide of responsive survey system</strong></p>
        <p class="mb-4">
          <strong>
            설문에 참여해주셔서 감사드립니다. 여러분의 의견을 수렴하여 양질의 서비스를 제공하도록
            최선을 다하겠습니다.
          </strong>
        </p>
        <div v-if="surveys.length">
          <div v-for="survey in surveys" :key="survey.id">
            <router-link :to="'/survey/' + survey.id" href="#" class="btn btn-info btn-lg my-3">
              {{ survey.title }}
              <i class="fa fa-send ml-2"></i>
            </router-link>
          </div>
        </div>
        <div v-else class="text-warning">오픈된 설문이 없습니다.</div>
      </div>
    </section>

    <section class="text-center text-md-start mt-5">
      <h4 class="mb-5"><strong>Latest posts</strong></h4>
      <div class="row">
        <div class="col-md-4 mb-4">
          <div
            class="bg-image hover-overlay shadow-1-strong rounded ripple"
            data-mdb-ripple-color="light"
          >
            <img src="https://mdbootstrap.com/img/new/standard/nature/002.jpg" class="img-fluid" />
            <a href="#!">
              <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            </a>
          </div>
        </div>

        <div class="col-md-8 mb-4">
          <h5>Very long post title</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ratione
            necessitatibus itaque error alias repellendus nemo reiciendis aperiam quisquam minus
            ipsam reprehenderit commodi ducimus, in dicta aliquam eveniet dignissimos magni.
          </p>

          <button type="button" class="btn btn-primary">Read</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  created() {
    let url = this.apiUrl + "surveys"
    console.log("api URL : ", url)
    this.axios.get(url).then((res) => {
      if (res.status !== 200) {
        alert("Error on getting surveys data...")
        return
      }
      this.surveys = res.data
    })
  },
  data() {
    return {
      surveys: []
    }
  },
  methods: {}
}
</script>

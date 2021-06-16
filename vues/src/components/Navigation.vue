<template>
  <!--Main Navigation-->
  <header>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container-fluid">
        <!-- Navbar brand -->
        <router-link class="navbar-brand" to="/" href="#">
          <img
            src="../../public/img/cnlife-logo.png"
            height="36"
            alt=""
            loading="lazy"
            style="margin-top: 0px;"
          />
          <strong class="text-primary">Survey</strong>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarExample01"
          aria-controls="navbarExample01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarExample01">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <router-link to="/" tag="li" class="nav-item">
              <a class="nav-link" aria-current="page" href="#">Home</a>
            </router-link>
            <router-link to="/user" tag="li" class="nav-item">
              <a class="nav-link" aria-current="page" href="#">Signup</a>
            </router-link>
            <router-link to="/admin" tag="li" class="nav-item">
              <a class="nav-link" aria-current="page" href="#">Admin</a>
            </router-link>
            <router-link to="/about" tag="li" class="nav-item">
              <a class="nav-link" aria-current="page" href="#">About</a>
            </router-link>
          </ul>

          <ul class="navbar-nav d-flex flex-row">
            <!-- Icons -->
            <li class="nav-item me-3 me-lg-0">
              <a
                class="nav-link"
                href="https://github.com/mecha2k/nodevue"
                rel="nofollow"
                target="_blank"
              >
                <i class="fab fa-github"></i> <strong>Github</strong>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Navbar -->
  </header>
</template>

<script>
export default {
  created() {},
  data() {
    return {}
  },
  methods: {}
}
</script>

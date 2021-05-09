import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Posts from "../views/Posts.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
    children: [
      {
        path: "/post/:id",
        name: "Post",
        component: () => import(/* webpackChunkName: "post1" */ "../views/Post.vue")
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

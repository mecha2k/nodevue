import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"

const Admin = () => import(/* webpackChunkName: "admin" */ "@/views/Admin.vue")
const About = () => import(/* webpackChunkName: "about" */ "@/views/About.vue")
const Survey = () => import(/* webpackChunkName: "survey" */ "@/views/Survey.vue")

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/admin", name: "Admin", component: Admin },
  { path: "/survey/:id", name: "Survey", component: Survey },
  { path: "/about", name: "About", component: About }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkExactActiveClass: "active",
  routes: routes
})

export default router

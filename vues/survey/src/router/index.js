import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"

const Admin = () => import(/* webpackChunkName: "admin" */ "@/views/Admin.vue")
const About = () => import(/* webpackChunkName: "about" */ "@/views/About.vue")
const User = () => import(/* webpackChunkName: "user" */ "@/views/User.vue")
const Survey = () => import(/* webpackChunkName: "survey" */ "@/views/Survey.vue")
const SurveyList = () => import(/* webpackChunkName: "surveylist" */ "@/views/SurveyList.vue")
const SurveyEdit = () => import(/* webpackChunkName: "surveyedit" */ "@/views/SurveyEdit.vue")

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/user", name: "User", component: User },
  { path: "/admin", name: "Admin", component: Admin },
  { path: "/survey/:id", name: "Survey", component: Survey },
  {
    path: "/surveylist",
    name: "SurveyList",
    component: SurveyList,
    children: [{ path: "/surveylist/edit/:id", name: "SurveyEdit", component: SurveyEdit }]
  },
  { path: "/about", name: "About", component: About }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkExactActiveClass: "active",
  routes: routes
})

export default router

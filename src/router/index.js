import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView'
import DashboardView from '../views/DashboardView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  }
]

const router = new VueRouter({
  routes
})

export default router

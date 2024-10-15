import Vue from 'vue'
import VueRouter, { type RouteConfig } from 'vue-router'
import AutoRouter from './auto-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [...AutoRouter]

const router = new VueRouter({
  routes,
})

export default router

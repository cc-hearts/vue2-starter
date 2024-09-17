import Vue from 'vue';
import VueRouter, { type RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [];

const router = new VueRouter({
  routes,
});

export default router;

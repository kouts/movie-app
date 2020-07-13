import Vue from 'vue';
import VueRouter from 'vue-router';
import Undefined from '@/layouts/undefined/Undefined.vue';
import Default from '@/layouts/default/Default.vue';
import Home from '../views/Home.vue';

Vue.component('layout-undefined', Undefined);
Vue.component('layout-default', Default);

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'default'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/Search.vue'),
    meta: {
      layout: 'default'
    }
  }
];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

export default router;

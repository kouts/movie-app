import Vue from 'vue';
import VueRouter from 'vue-router';
import Default from '@/layouts/default/Default.vue';
import Home from '../views/Home.vue';

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
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue'),
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

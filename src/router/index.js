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

// Save and restore scroll position
const scrollPositions = {};
router.beforeEach((to, from, next) => {
  scrollPositions[from.name] = window.pageYOffset;
  next();
});
router.afterEach((to, from) => {
  Vue.nextTick(() => {
    window.scrollTo(0, scrollPositions[to.name] || 0);
  });
});

export default router;

import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-named-default
import { default as moviesHome, default as moviesSearch } from './modules/movies';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    appName: 'MovieApp'
  },
  modules: {
    moviesHome,
    moviesSearch
  }
});

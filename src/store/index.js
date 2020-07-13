import Vue from 'vue';
import Vuex from 'vuex';
import { request } from '@/common/request';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    genres: []
  },
  actions: {
    fetchGenres({ commit, state }, data) {
      return request({
        url: '/genre/movie/list'
      }).then(res => {
        commit('SET_GENRES', res.genres);
      });
    }
  },
  mutations: {
    SET_GENRES(state, data) {
      const genres = {};
      for (let index = 0; index < data.length; index++) {
        genres[data[index].id] = data[index].name;
      }
      state.genres = genres;
    }
  },
  modules: {
  }
});

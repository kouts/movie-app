import Vue from 'vue';
import Vuex from 'vuex';
import { request } from '@/common/request';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    genres: [],
    movies: []
  },
  actions: {
    fetchGenres({ commit, state }, data) {
      return request({
        url: '/genre/movie/list'
      }).then(res => {
        commit('SET_GENRES', res.genres);
      });
    },
    fetchMovies({ commit, state }, data) {
      console.log(data);
      return request({
        url: 'movie/now_playing',
        params: {
          page: data.page
        }
      }).then(res => {
        commit('SET_MOVIES', res.results);
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
    },
    SET_MOVIES(state, data) {
      state.movies = data;
    }
  },
  modules: {
  }
});

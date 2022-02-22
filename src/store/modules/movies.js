import { fetchMovies, searchMovies } from '@/api/movies'
import { fetchGenres } from '@/api/genres'

const state = () => ({
  movies: [],
  genres: [],
  loading: false,
  page: 0,
  totalResults: 0
})

const actions = {
  async fetchMovies({ commit }, page) {
    commit('SET_LOADING', true)
    const res = await fetchMovies(page)
    commit('UPDATE_MOVIES', res.results)
    commit('SET_PAGE', res.page)
    commit('SET_TOTAL_RESULTS', res.total_results)
    commit('SET_LOADING', false)
  },
  async fetchGenres({ commit }) {
    const res = await fetchGenres()
    commit('SET_GENRES', res.genres)
  },
  async searchMovies({ commit }, { clear, query, page }) {
    if (clear) {
      commit('SET_MOVIES', [])
      commit('SET_PAGE', 0)
      commit('SET_TOTAL_RESULTS', 0)
    }
    if (query) {
      commit('SET_LOADING', true)
      const res = await searchMovies(query, page)
      commit('UPDATE_MOVIES', res.results)
      commit('SET_PAGE', res.page)
      commit('SET_TOTAL_RESULTS', res.total_results)
      commit('SET_LOADING', false)
    }
  }
}

const mutations = {
  UPDATE_MOVIES: (state, movies) => {
    state.movies = state.movies.concat(movies)
  },
  SET_MOVIES: (state, movies) => {
    state.movies = movies
  },
  SET_GENRES: (state, genres) => {
    state.genres = genres
  },
  SET_LOADING: (state, loading) => {
    state.loading = loading
  },
  SET_PAGE: (state, page) => {
    state.page = page
  },
  SET_TOTAL_RESULTS: (state, totalResults) => {
    state.totalResults = totalResults
  }
}

const getters = {
  genresMap(state) {
    return state.genres.reduce((obj, item) => {
      obj[item.id] = item.name
      return obj
    }, {})
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

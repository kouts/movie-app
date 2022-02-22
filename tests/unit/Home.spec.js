import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '@/views/Home.vue'
import { moviesPayload, genresMap } from './data/movies'
import { merge } from 'lodash-es'

const localVue = createLocalVue()
localVue.use(Vuex)

const createStore = (options) => {
  const defaults = {
    namespaced: true,
    state: {
      movies: [],
      genres: [],
      loading: false,
      page: 0,
      totalResults: 0
    },
    actions: {
      fetchMovies: jest.fn(),
      fetchGenres: jest.fn()
    },
    getters: {
      genresMap(state) {
        return genresMap
      }
    }
  }
  const moviesHome = merge(defaults, options)
  return new Vuex.Store({ modules: { moviesHome } })
}

describe('Home.vue', () => {
  it('correctly renders a list of cards', (done) => {
    const store = createStore({
      state: {
        movies: moviesPayload.results
      }
    })
    const wrapper = mount(Home, { store, localVue })
    setTimeout(() => {
      const cards = wrapper.findAll('.card')
      expect(cards.length).toBe(2)
      done()
    })
  })

  it('displays a message when no movies found', (done) => {
    const store = createStore({
      state: {
        movies: []
      }
    })
    const wrapper = mount(Home, { store, localVue })
    setTimeout(() => {
      const cards = wrapper.findAll('.card')
      expect(cards.length).toBe(0)
      expect(wrapper.find('div.text-center').text()).toBe('No movies found')
      done()
    })
  })
})

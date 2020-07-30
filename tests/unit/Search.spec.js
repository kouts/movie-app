import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Search from '@/views/Search.vue';
import { moviesPayload, genresMap } from './data/movies';
import { merge } from 'lodash-es';

const localVue = createLocalVue();
localVue.use(Vuex);

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
      searchMovies: jest.fn(),
      fetchGenres: jest.fn()
    },
    getters: {
      genresMap(state) {
        return genresMap;
      }
    }
  };
  const moviesSearch = merge(defaults, options);
  return new Vuex.Store({ modules: { moviesSearch } });
};

describe('Home.vue', () => {
  it('correctly fires the search handler', (done) => {
    const store = createStore();
    const wrapper = mount(Search, { store, localVue });
    const inputSearch = wrapper.find('input[type="search"]');
    setTimeout(() => {
      jest.spyOn(wrapper.vm, 'searchHandler');
      inputSearch.trigger('input', 'test');
      expect(wrapper.vm.searchHandler).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('displays a no results found message when search results are empty', (done) => {
    const store = createStore();
    const wrapper = mount(Search, {
      store,
      localVue,
      data() {
        return {
          searchQuery: 'test'
        };
      }
    });
    setTimeout(() => {
      expect(wrapper.find('div.text-center').text()).toBe('No results found');
      done();
    });
  });
  it('displays a no more results found message when search results do not contain any more entries', (done) => {
    const store = createStore({
      state: {
        movies: moviesPayload.results,
        page: 1,
        totalResults: 2
      }
    });
    const wrapper = mount(Search, {
      store,
      localVue,
      data() {
        return {
          searchQuery: 'test'
        };
      }
    });
    setTimeout(() => {
      expect(wrapper.find('div.text-center.mt-4').text()).toBe('There are no more results to display');
      done();
    });
  });
});

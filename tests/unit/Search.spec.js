import { mount } from '@vue/test-utils';
import Home from '@/views/Search.vue';
import { moviesPayload, genres } from './data/movies';
import * as apiGenres from '@/api/genres';
import * as apiMovies from '@/api/movies';
import { clone } from '@/common/utils';

const originalFetchGenres = apiGenres.fetchGenres;
const originalSearchMovies = apiMovies.searchMovies;
apiGenres.fetchGenres = jest.fn();
apiMovies.searchMovies = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  // Reset to original implementation before each test
  apiGenres.fetchGenres.mockImplementation(originalFetchGenres);
  apiMovies.searchMovies.mockImplementation(originalSearchMovies);
});

describe('Home.vue', () => {
  it('correctly fires the search handler', () => {
    const wrapper = mount(Home);
    const inputSearch = wrapper.find('input[type="search"]');
    jest.spyOn(wrapper.vm, 'searchHandler');
    inputSearch.trigger('input', 'test');
    expect(wrapper.vm.searchHandler).toHaveBeenCalledTimes(1);
  });
  it('Fetches results when searched', (done) => {
    apiGenres.fetchGenres.mockImplementation(() => Promise.resolve(genres));
    apiMovies.searchMovies.mockImplementation(() => Promise.resolve(moviesPayload));
    const wrapper = mount(Home);
    const inputSearch = wrapper.find('input[type="search"]');
    inputSearch.setValue('test');
    setTimeout(() => {
      expect(wrapper.vm.movies.length).toBe(2);
      done();
    }, 370);
  });
  it('displays a no results found message when search results are empty', (done) => {
    apiGenres.fetchGenres.mockImplementation(() => Promise.resolve(genres));
    apiMovies.searchMovies.mockImplementation(() => {
      return Promise.resolve({
        results: [],
        page: 0,
        total_results: 0
      });
    });
    const wrapper = mount(Home, {
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
    apiGenres.fetchGenres.mockImplementation(() => Promise.resolve(genres));
    const wrapper = mount(Home, {
      data() {
        return {
          movies: clone(moviesPayload.results),
          page: 1,
          totalResults: 2,
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

import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import { moviesPayload, genres } from './data/movies';
import * as apiGenres from '@/api/genres';
import * as apiMovies from '@/api/movies';
import { clone } from '@/common/utils';

const originalFetchGenres = apiGenres.fetchGenres;
const originalFetchMovies = apiMovies.fetchMovies;
apiGenres.fetchGenres = jest.fn();
apiMovies.fetchMovies = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  // Reset to original implementation before each test
  apiGenres.fetchGenres.mockImplementation(originalFetchGenres);
  apiMovies.fetchMovies.mockImplementation(originalFetchMovies);
});

describe('Home.vue', () => {
  it('correctly renders a list of cards', (done) => {
    apiGenres.fetchGenres.mockImplementation(() => Promise.resolve(genres));
    apiMovies.fetchMovies.mockImplementation(() => Promise.resolve(moviesPayload));
    const wrapper = mount(Home);
    setTimeout(() => {
      const cards = wrapper.findAll('.card');
      expect(cards.length).toBe(2);
      done();
    });
  });
  it('displays a message when no movies found', (done) => {
    apiGenres.fetchGenres.mockImplementation(() => Promise.resolve(genres));
    apiMovies.fetchMovies.mockImplementation(() => {
      const payload = clone(moviesPayload);
      payload.results = [];
      return Promise.resolve(payload);
    });
    const wrapper = mount(Home);
    setTimeout(() => {
      const cards = wrapper.findAll('.card');
      expect(cards.length).toBe(0);
      expect(wrapper.find('div.text-center').text()).toBe('No movies found');
      done();
    });
  });
});

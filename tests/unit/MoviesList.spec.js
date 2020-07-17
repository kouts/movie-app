import { mount } from '@vue/test-utils';
import MoviesList from '@/components/MoviesList.vue';
import { moviesPayload, genres } from './data/movies';
import * as apiGenres from '@/api/genres';
import * as apiMovies from '@/api/movies';

const originalFetchGenres = apiGenres.fetchGenres;
const originalFetchMovies = apiMovies.fetchMovies;
const originalSearchMovies = apiMovies.searchMovies;
apiGenres.fetchGenres = jest.fn();
apiMovies.fetchMovies = jest.fn();
apiMovies.searchMovies = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  // Reset to original implementation before each test
  apiGenres.fetchGenres.mockImplementation(originalFetchGenres);
  apiMovies.fetchMovies.mockImplementation(originalFetchMovies);
  apiMovies.searchMovies.mockImplementation(originalSearchMovies);
});

describe('MoviesList.vue', () => {
  it('correctly renders a list of cards', async() => {
    apiGenres.fetchGenres.mockImplementation(() => Promise.resolve(genres));
    apiMovies.fetchMovies.mockImplementation(() => Promise.resolve(moviesPayload));
    apiMovies.searchMovies.mockImplementation(() => Promise.resolve(moviesPayload));
    const wrapper = mount(MoviesList);
    await wrapper.vm.$nextTick();
    const cards = wrapper.findAll('.card');
    expect(cards.length).toBe(2);
  });
  it('correctly renders a list of cards when the query changes', (done) => {
    const moviesPayloadClone = JSON.parse(JSON.stringify(moviesPayload));
    moviesPayloadClone.results = moviesPayloadClone.results.slice(0, 1);
    moviesPayloadClone.results[0].title = 'New title';
    apiGenres.fetchGenres.mockImplementation(() => Promise.resolve(genres));
    apiMovies.fetchMovies.mockImplementation(() => Promise.resolve(moviesPayload));
    apiMovies.searchMovies.mockImplementation(() => Promise.resolve(moviesPayloadClone));

    const wrapper = mount(MoviesList);
    wrapper.setProps({ query: 'bar' });
    setTimeout(() => {
      const cards = wrapper.findAll('.card');
      expect(cards.length).toBe(1);
      expect(wrapper.vm.movies[0].title).toBe('New title');
      done();
    }, 350);
  });
});

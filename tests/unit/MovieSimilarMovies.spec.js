import { shallowMount } from '@vue/test-utils';
import MovieSimilarMovies from '@/components/MovieSimilarMovies.vue';
import { similarMovies } from './data/movies';

describe('MovieSimilarMovies.vue', () => {
  it('correctly renders reviews', () => {
    const wrapper = shallowMount(MovieSimilarMovies, {
      propsData: {
        movies: similarMovies
      }
    });
    const rows = wrapper.findAll('tbody > tr');
    expect(rows.length).toBe(similarMovies.length);
  });
  it('only displays a message when no movies are passed', () => {
    const wrapper = shallowMount(MovieSimilarMovies);
    const table = wrapper.find('table');
    expect(table.exists()).toBe(false);
    expect(wrapper.find('div > div').text()).toBe('No similar movies found');
  });
});

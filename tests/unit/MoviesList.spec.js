import { mount } from '@vue/test-utils';
import MoviesList from '@/components/MoviesList.vue';
import { movies, genresMap } from './data/movies';

describe('MoviesList.vue', () => {
  it('correctly renders a list of cards', () => {
    const wrapper = mount(MoviesList, {
      propsData: {
        movies,
        genresMap: genresMap
      }
    });
    const cards = wrapper.findAll('.card');
    expect(cards.length).toBe(2);
  });
  it('does not render anything when no props are passed', () => {
    const wrapper = mount(MoviesList);
    const divs = wrapper.findAll('div.row > div');
    expect(divs.exists()).toBe(false);
  });
});

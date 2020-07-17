import { shallowMount } from '@vue/test-utils';
import MovieGenres from '@/components/MovieGenres.vue';
import Vue from 'vue';

describe('MovieGenres.vue', () => {
  const genres = ['Action', 'Drama', 'History', 'War'];
  const wrapper = shallowMount(MovieGenres, {
    propsData: {
      genres
    }
  });
  it('correctly renders a series of badges when genres are passed', () => {
    const badges = wrapper.findAll('.badge');
    expect(badges.length).toBe(4);
  });
  it('renders a message when no genres are passed', async() => {
    wrapper.setProps({ genres: [] });
    await Vue.nextTick();
    const badges = wrapper.findAll('.badge');
    expect(badges.exists()).toBe(false);
    expect(wrapper.find('span').text()).toBe('Unknown genre');
  });
});

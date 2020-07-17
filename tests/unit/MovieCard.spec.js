import { shallowMount } from '@vue/test-utils';
import MovieCard from '@/components/MovieCard.vue';
import { movies } from './data/movies';

describe('MovieCard.vue', () => {
  const movie = movies.slice(0, 1);
  const wrapper = shallowMount(MovieCard, {
    propsData: {
      movieId: 1,
      posterPath: movie.poster_path,
      title: movie.title,
      releaseDate: movie.release_date,
      genres: movie.genres,
      voteAverage: movie.vote_average,
      overview: movie.overview
    }
  });
  it('renders correctly when passed props', () => {
    const card = wrapper.find('div.card');
    expect(card.exists()).toBe(true);
  });

  it('emits view details event with movieId as payload', async() => {
    await wrapper.find('h5 > a').trigger('click');
    expect(wrapper.emitted('view-details')).toBeTruthy();
    expect(wrapper.emitted('view-details')[0]).toEqual([1]);
  });
});

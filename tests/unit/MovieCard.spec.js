import { shallowMount } from '@vue/test-utils';
import MovieCard from '@/components/MovieCard.vue';
import { movies } from './data/movies';

describe('MovieCard.vue', () => {
  const movie = movies.slice(0, 1);
  it('renders correctly when passed props', () => {
    const wrapper = shallowMount(MovieCard, {
      propsData: {
        movieId: movie.id,
        posterPath: movie.poster_path,
        title: movie.title,
        releaseDate: movie.release_date,
        genres: movie.genres,
        voteAverage: movie.vote_average,
        overview: movie.overview
      }
    });
    const card = wrapper.find('div.card');
    expect(card.exists()).toBe(true);
  });
});

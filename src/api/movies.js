import { request } from '@/common/request';

export function fetchMovies(page) {
  return request({
    url: 'movie/now_playing',
    params: {
      page: page
    }
  });
};

export function searchMovies(query, page) {
  return request({
    url: 'search/movie',
    params: {
      query,
      page
    }
  });
};

export function fetchMovie(movieId) {
  return request({
    url: 'movie/' + movieId
  });
};

export function fetchMovieVideos(movieId) {
  return request({
    url: 'movie/' + movieId + '/videos'
  });
};

export function fetchMovieReviews(movieId) {
  return request({
    url: 'movie/' + movieId + '/reviews'
  });
};

export function fetchMovieSimilarMovies(movieId) {
  return request({
    url: 'movie/' + movieId + '/similar'
  });
};

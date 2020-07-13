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

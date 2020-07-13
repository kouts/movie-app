import { request } from '@/common/request';

export function fetchMovies(page) {
  return request({
    url: 'movie/now_playing',
    params: {
      page: page
    }
  });
};

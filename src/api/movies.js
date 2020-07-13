import { request } from '@/common/request';

export function fetchMovies(page) {
  console.log('firing fetchMovies');
  return request({
    url: 'movie/now_playing',
    params: {
      page: page
    }
  });
};

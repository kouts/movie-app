import { request } from '@/common/request';

export function fetchGenres() {
  return request({
    url: '/genre/movie/list'
  });
};

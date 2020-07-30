import { request } from '@/common/request';

export const fetchGenres = () => {
  return request({
    url: '/genre/movie/list'
  });
};

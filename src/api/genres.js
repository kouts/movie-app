import { request } from '@/common/request';

export const fetchGenres = () => {
  return request({
    url: '/genre/movie/list'
  }).then((data) => {
    return data.genres.reduce((obj, item) => {
      obj[item.id] = item.name;
      return obj;
    }, {});
  });
};

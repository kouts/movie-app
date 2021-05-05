import { request } from '@/common/request'

export const fetchMovies = (page) => {
  return request({
    url: 'movie/now_playing',
    params: {
      page: page
    }
  })
}

export const searchMovies = (query, page) => {
  return request({
    url: 'search/movie',
    params: {
      query,
      page
    }
  })
}

export const fetchMovie = (movieId) => {
  return request({
    url: 'movie/' + movieId
  })
}

export const fetchMovieVideos = (movieId) => {
  return request({
    url: 'movie/' + movieId + '/videos'
  })
}

export const fetchMovieReviews = (movieId) => {
  return request({
    url: 'movie/' + movieId + '/reviews'
  })
}

export const fetchMovieSimilarMovies = (movieId, page) => {
  return request({
    url: 'movie/' + movieId + '/similar',
    params: {
      page: page
    }
  })
}

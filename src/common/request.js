import axios from 'axios'

const apiKey = 'fa8c8471135a8154a87c9a650572cb1f'
const language = 'en-US'

// Create an axios instance
const request = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 5000 // Request timeout
})

// Request interceptor
request.interceptors.request.use(
  (config) => {
    config.params = config.params || {}
    config.params.api_key = apiKey
    config.params.language = language
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// Response interceptor
request.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  (error) => {
    // Global api response error handling here...
    console.log(error)
    return Promise.reject(error)
  }
)

export { request }

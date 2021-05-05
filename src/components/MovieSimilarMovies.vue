<template>
  <div>
    <table v-if="movies.length !== 0" class="table table-sm table-striped mb-0">
      <thead>
        <tr>
          <th scope="col" class="border-top-0">Titles</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(movie, index) in movies" :key="movie.id + '-' + index">
          <td>
            <movie-image
              :path="movie.poster_path"
              :title="movie.title"
              width-api="w92"
              width="46px"
              poster-class="img-thumbnail"
              class="d-inline-block"
            />
            {{ movie.title }} ({{ getYearFromIsoDate(movie.release_date) || 'N/A' }})
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>No similar movies found</div>
  </div>
</template>

<script>
import MovieImage from '@/components/MovieImage.vue'
import { getYearFromIsoDate } from '@/common/utils'

export default {
  components: {
    MovieImage
  },
  props: {
    movies: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getYearFromIsoDate(isoDate) {
      return getYearFromIsoDate(isoDate)
    }
  }
}
</script>

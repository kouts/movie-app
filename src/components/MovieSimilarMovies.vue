<template>
<div>
  <table v-if="movies.length !==0" class="table table-sm table-striped mb-0">
    <thead>
      <tr>
        <th scope="col" class="border-top-0">Titles</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="movie in movies" :key="movie.id">
        <td>
          <movie-image :path="movie.poster_path" :title="movie.title" widthApi="w92" width="46px" posterClass="img-thumbnail" class="d-inline-block" />
          {{ movie.title }} ({{ getYearFromIsoDate(movie.release_date) || 'N/A' }})
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else>
    No similar movies found.
  </div>
</div>
</template>

<script>
import MovieImage from '@/components/MovieImage.vue';
import { getYearFromIsoDate } from '@/common/utils';

export default {
  props: {
    movies: {
      type: Array,
      default: () => []
    }
  },
  components: {
    MovieImage
  },
  methods: {
    getYearFromIsoDate(isoDate) {
      return getYearFromIsoDate(isoDate);
    }
  }
};
</script>

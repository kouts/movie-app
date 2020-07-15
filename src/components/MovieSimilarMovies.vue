<template>
  <div>
    <table v-if="movies.length !==0" class="table table-sm table-striped">
      <thead>
        <tr>
          <th scope="col" class="border-top-0">Titles</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie.id">
          <td>
            <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" class="img-thumbnail" :alt="title" style="width: 48px;">
            <img v-else src="@/assets/not-available.png" class="img-fluid border" alt="Poster not available">
            {{ movie.title }}
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
export default {
  props: {
    movies: {
      type: Array,
      default: () => []
    }
  }
};
</script>

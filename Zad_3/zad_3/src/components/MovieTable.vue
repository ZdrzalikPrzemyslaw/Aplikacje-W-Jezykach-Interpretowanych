<template>
  <div class="my_table">
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Production Year</th>
          <th>Cast</th>
          <th>Genres</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in this.get_movies()" :key="movie.title">
          <td>{{ movie.title }}</td>
          <td>{{ movie.year }}</td>
          <td>{{ movie.cast.join(", ") }}</td>
          <td>{{ movie.genres.join(", ") }}</td>
        </tr>
      </tbody>
    </table>
    <button type="button" v-on:click="next">Następne</button>
  </div>
</template>

<script>
import _ from "underscore";

export default {
  name: "MovieTable",
  data() {
    return {
      movie_count: 10,
      current_start_movie: 0,
    };
  },
  methods: {
    get_movies: function() {
      let filmy = _.sortBy(this.dataArray, function(film) {
        return film.title;
      });
      return filmy.slice(
        this.current_start_movie,
        this.current_start_movie + this.movie_count
      );
    },
    next: function() {
      this.current_start_movie += this.movie_count;
    },
  },
  props: {
    dataArray: Array,
  },
  watch: {
    dataArray: function() {
      this.current_start_movie = 0;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

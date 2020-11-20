<template>
  <div class="my_table">
    <table>
      <thead>
        <tr>
          <th>
            Title
          </th>
          <th>
            Production Year
          </th>
          <th>
            Cast
          </th>
          <th>
            Genres
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in this.get_movies(this.genres[0])" :key="movie.title">
          <td>
            {{ movie.title }}
          </td>
          <td>
            {{ movie.year }}
          </td>
          <td>
            {{ movie.cast }}
          </td>
          <td>
            {{ movie.genres }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import json from "../json/movies.json";
import _ from "underscore";

export default {
  name: "FilmyWgGatunku",
  data() {
    return {
      movies: json,
      movie_count: 100,
      current_start_movie: 0,
      genres: ["Comedy"],
    };
  },
  methods: {
    get_movies: function(genre) {
      let list = _.filter(this.movies, function(film) {
        for (const g in film.genres) {
                if (film.genres[g] === genre) {
                    return true;
                }
        }
        return false;
      })
      list = _.sortBy(list, function(film) {
          return film.title
      })
      return list.slice(0, this.movie_count);
    },
  },
  props: {

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

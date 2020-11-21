<template>
  <div class="my_list">
    <h1>Filmy wg gatunku</h1>
    <ol>
      <template v-for="genre in genres">
        <div v-for="(movie, index, key) in get_movies_by_genre(genre)" :key="key">
          <h2 v-if="index === 0">{{ genre }}</h2>
          {{ index + 1 }}. {{ movie.title }}
        </div>
      </template>
    </ol>
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
      genres: [],
    };
  },
  methods: {
    get_movies_by_genre: function(genre) {
      let list = this.movies;
      list = _.filter(list, function(film) {
        for (const g in film.genres) {
          if (film.genres[g] === genre) {
            return true;
          }
        }
        return false;
      });
      list = _.sortBy(list, function(film) {
        return film.title;
      });
      return list;
    },
    get_genres: function() {
      let list = [];
      for (const c in this.movies) {
        for (const g in this.movies[c].genres) {
          if (!list.includes(this.movies[c].genres[g])) {
            list.push(this.movies[c].genres[g]);
          }
        }
      }
      this.genres = list;
    },
    get_100_random_movies: function() {
      let result = [];
      for (let i = 0; i < this.movie_count; i++) {
        result.push(this.movies[Math.floor(Math.random() * this.movies.length)])
      }
      return result;
    },
  },
  created() {
    this.movies = this.get_100_random_movies();
    this.get_genres();
  },
  props: {},
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

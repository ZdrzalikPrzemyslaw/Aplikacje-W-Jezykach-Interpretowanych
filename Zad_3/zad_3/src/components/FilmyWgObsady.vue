<template>
  <div class="my_list">
    <div>
      <h1>Filmy wg obsady</h1>
    </div>
    <ol>
      <template v-for="genre in cast">
        <div v-for="(movie, index, key) in get_movies(genre)" :key="key">
          <h2 v-if="index === 0">{{ genre }}</h2>
          {{ movie.title }}
        </div>
      </template>
    </ol>
  </div>
</template>

<script>
import json from "../json/movies.json";
import _ from "underscore";

export default {
  name: "FilmyWgObsady",
  data() {
    return {
      movies: json,
      movie_count: 100,
      current_start_movie: 0,
      cast: [],
    };
  },
  methods: {
    get_movies: function(genre) {
      let list = _.filter(this.movies, function(film) {
        for (const g in film.cast) {
          if (film.cast[g] === genre) {
            return true;
          }
        }
        return false;
      });
      list = _.sortBy(list, function(film) {
        return film.title;
      });
      return list.slice(0, this.movie_count);
    },
    get_cast: function() {
      let list = [];
      for (const c in this.movies) {
        for (const g in this.movies[c].cast) {
          if (!list.includes(this.movies[c].cast[g])) {
            list.push(this.movies[c].cast[g]);
          }
        }
      }
      this.cast = list;
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
    this.get_cast();
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

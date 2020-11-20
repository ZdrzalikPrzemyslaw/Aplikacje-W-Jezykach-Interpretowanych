<template>
  <div class="my_list">
    <ol>
      <template v-for="genre in genres">
        <div v-for="(movie,index, key) in get_movies(genre)" :key="key">
            <h1 v-if="index ===0"> {{genre}}</h1>
          {{index + 1}}. {{ movie.title }}
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
      genres: ["Comedy", "Crime", "Romance", "Animated", "Family"],
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
      });
      list = _.sortBy(list, function(film) {
        return film.title;
      });
      return list.slice(0, this.movie_count);
    },
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

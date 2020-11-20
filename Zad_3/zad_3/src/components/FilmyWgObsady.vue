<template>
  <div class="my_list">
    <div>
      <h1>Filmy wg obsady</h1>
    </div>
    <ol>
      <template v-for="genre in cast">
        <div v-for="(movie, index, key) in get_movies(genre)" :key="key">
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
  name: "FilmyWgObsady",
  data() {
    return {
      movies: json,
      movie_count: 100,
      current_start_movie: 0,
      cast: [
        "James McAvoy",
        "Emily Blunt",
        "Johnny Depp",
        "Chiwetel Ejiofor",
        "Mary J. Blige",
        "Michael Caine",
        "Maggie Smith",
        "Ashley Jensen",
        "Matt Lucas",
        "Stephen Merchant",
        "Julie Walters",
        "Richard Wilson",
      ],
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

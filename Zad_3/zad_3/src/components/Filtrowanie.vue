<template>
  <div class="my_filter">
    <input
      v-model="title"
      class="form-control"
      placeholder="Podaj tytuł lub fragment tytułu filmu"
    />
    <input
      v-model="yearFrom"
      placeholder="Liczba naturlana z przedziału 1900-2019"
    />
    <input
      v-model="yearTo"
      placeholder="Liczba naturlana z przedziału 1900-2019"
    />
    <input v-model="cast" placeholder="Imię i nazwisko" />
    <br />
    <button type="button" v-on:click="filter">Search</button>
  </div>
</template>

<script>
import json from "../json/movies.json";
import _ from "underscore";

export default {
  name: "Filtrowanie",
  data() {
    return {
      movies: json,
      title: "",
      yearFrom: "",
      yearTo: "",
      cast: "",
    };
  },
  methods: {
    filter: function() {
      let self = this;
      let list = _.filter(this.movies, function(film) {
        if (
          (self.title === "" ||
            film.title.toLowerCase().includes(self.title.toLowerCase())) &&
          (self.yearFrom === "" || self.yearFrom <= film.year) &&
          (self.yearTo === "" || self.yearTo >= film.year)
        ) {
          for (const key in film.cast) {
            if (
              self.cast === "" ||
              film.cast[key].toLowerCase() === self.cast.toLowerCase()
            ) {
              return true;
            }
          }
        }
        return false;
      });
      list = _.sortBy(list, function(film) {
        return film.title;
      });
      this.$emit("search-event", list);
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

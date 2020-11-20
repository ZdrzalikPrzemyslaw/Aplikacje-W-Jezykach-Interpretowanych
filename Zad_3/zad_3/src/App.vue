<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <filtrowanie @search-event="handleAppEvent"/>
    <movie-table :dataArray='eventData'/>
    <filmy-wg-gatunku/>
    <filmy-wg-obsady/>
  </div>
</template>

<script>
import FilmyWgGatunku from './components/FilmyWgGatunku.vue'
import FilmyWgObsady from './components/FilmyWgObsady.vue'
import Filtrowanie from './components/Filtrowanie.vue'
import MovieTable from './components/MovieTable.vue'
import movies from './json/movies.json'

export default {
  name: 'App',
  components: {
    MovieTable,
    FilmyWgGatunku,
    FilmyWgObsady,
    Filtrowanie
  },
  data: function() {
    return {
      eventData: movies
    }
  }, methods: {
    handleAppEvent: function(data) {
      this.eventData = data;
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

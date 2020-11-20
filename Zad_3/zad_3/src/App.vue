<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <movie-table/>
    <filmy-wg-gatunku/>
  </div>
</template>

<script>
import FilmyWgGatunku from './components/FilmyWgGatunku.vue'
import MovieTable from './components/MovieTable.vue'


export default {
  name: 'App',
  components: {
    MovieTable,
    FilmyWgGatunku
  }
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

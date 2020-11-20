<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <MovieTable msg="XD"/>
  </div>
</template>

<script>
import MovieTable from './components/MovieTable.vue'


export default {
  name: 'App',
  components: {
    MovieTable
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

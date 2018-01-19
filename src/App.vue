<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: { NavBar },
  metaInfo: {
    title: 'Default Title',
    titleTemplate: '%s'
  }
}
</script>

<style lang="sass">
@import './assets/css/main'

</style>

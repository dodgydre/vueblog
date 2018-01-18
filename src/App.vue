<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    title: 'Default Title',
    titleTemplate: '%s'
  }
}
</script>

<style lang="sass">
@import './assets/css/main'

</style>

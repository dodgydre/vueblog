<template>
  <div>
    {{ $route.params.page_id }}
    <div v-if="data">
      {{ data }}
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
const blogConfig = require('./blog.config.js')

export default {
  data () {
    return {
      data: null
    }
  },
  mounted () {
    window.axios.get('https://api.github.com/users/dodgydre/gists')
      .then((data) => {
        this.data = data
      })
  },
  methods: {
    fetchPage () {
      let url = `http://api.github.com/gists/${blogConfig.gistId}`
      let
    }
  }
}
</script>

<template>
  <nav class="nav">
    <div class="nav-inner" v-if="pages != null">
      <router-link :to="{ path: '/'}" class="nav-link">HOME</router-link>
      <router-link :to="{ path: '/' + page.id }" class="nav-link"  v-for="page in pages" :key="page.id">{{ toUpper(page.id) }}</router-link>
    </div>
  </nav>
</template>

<script>
import { EventBus } from '../event-bus'

export default {
  data () {
    return {
      pages: null
    }
  },
  mounted () {
    EventBus.$on('menu-updated', (pages) => {
      this.pages = pages
    })
  },
  methods: {
    toUpper (str) {
      if (typeof str === 'string') {
        return str.toUpperCase()
      }
    }
  }
}
</script>

<style>

</style>

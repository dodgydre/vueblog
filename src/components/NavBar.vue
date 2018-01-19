<template>
  <div class="nav">
    <div class="inner-nav">
      <span v-if="pages" v-for="(page,key) in pages" :key="page.id">
        <span v-html="key"></span>
      </span>
    </div>
  </div>
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
  }
}
</script>

<style>
.nav {
  position: fixed;
  top: 0;
  padding: 1rem 0;
  margin-right: 0 auto;
}

.inner-nav {
  border-bottom: 1px solid #ddd;
  max-width: 50rem;
}
</style>

<template>
  <nav class="nav">
    <div class="nav-inner" v-if="pages != null">
      <router-link
        :to="{ path: '/'}"
        class="nav-link"
      >
        <span v-if="isCurrentPage('posts')" class="current">
          HOME
        </span>
        <span v-else>
          HOME
        </span>
      </router-link>
      <router-link
        :to="{ path: '/' + page.id }"
        class="nav-link"
        v-for="page in pages"
        :key="page.id"
      >
        <span v-if="isCurrentPage(page.id)" class="current">
          {{ toUpper(page.id)}}
        </span>
        <span v-else>
          {{ toUpper(page.id) }}
        </span>
      </router-link>
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
    },
    isCurrentPage (id) {
      if (id === 'posts' && this.$route.name == 'Posts') return true
      return (this.toUpper(this.$route.params.page_id) === this.toUpper(id))
    }
  }
}
</script>

<style lang="scss">

</style>

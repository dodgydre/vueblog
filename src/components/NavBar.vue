<template>
  <nav class="nav">
    <div class="nav-inner" v-if="pages != null">
      <!-- List POSTS first -->
      <router-link
        :to="{ path: '/'}"
        class="nav-link"
      >
        <span v-if="isCurrentPage('posts')" class="current">
          POSTS
        </span>
        <span v-else>
          POSTS
        </span>
      </router-link>

      <div class="dropdown">
        <span class="tags">(tags)</span>
        <div class="dropdown-content">
          <router-link
            v-for="tag in tags"
            :key="tag"
            :to="{path: '/posts/tag/' + tag}"
            class="dropdown-nav-link"
          >
            <span>{{ tag }}</span>
          </router-link>

        </div>
      </div>

      <!-- List any PAGES next -->
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
      pages: null,
      tags: null,
    }
  },
  created () {
    EventBus.$on('menu-updated', pages => {
      this.pages = pages
    })

    EventBus.$on('tags-updated', tags => {
      this.tags = tags
    })
  },
  methods: {
    toUpper (str) {
      if (typeof str === 'string') {
        return str.toUpperCase()
      }
    },
    isCurrentPage (id) {
      if (id === 'posts' && this.$route.name === 'Posts') return true
      return (this.toUpper(this.$route.params.page_id) === this.toUpper(id))
    }
  }
}
</script>

<style lang="scss">

</style>

<template>
  <main>
    <div v-if="loading"></div>

    <div v-else v-for="post in filtered_posts" :key="post.id">
      <router-link :to="{ path: '/posts/' + post.id }">
        <h1 v-html="post.meta.title"></h1>
        <div class="date">{{ post.meta.date | toShortDate }}</div>
        <div v-html="post.firstSentence"></div>
      </router-link>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      error: null,
      loading: true
    }
  },
  created () {
    this.fetchData()
  },
  // TODO: is tag filter working properly?
  // TODO: May be broken in the Post.vue when looking at specific post
  methods: {
    async fetchData () {
      this.loading = true
      try {
        await this.$store.dispatch('FETCH_POSTS')
      } catch (e) {
        this.error = { statusCode: 404, message: e.message }
      } finally {
        this.loading = false
      }
    },
  },
  computed: {
    ...mapState(['posts', 'tags', 'tags_filter']),

    // grab only those with correct tag
    filtered_posts() {
      return this.posts.filter(file => {
        if(this.$route.params.tag_id) {
          return file.meta.tags.includes(this.$route.params.tag_id)
        }
        return true
      })
    }
  },
  metaInfo () {
    return {
      title: 'Andreas Georghiou - Home',
      meta: [
        { hid: 'og:title', name: 'og:title', content: 'Andreas Georghiou - Home' },
        { hid: 'og:description', name: 'og:description', content: 'Some random musings.' },
        { hid: 'description', name: 'description', content: 'Some random musings.' }
      ]
    }
  }
}
</script>

<style>

</style>

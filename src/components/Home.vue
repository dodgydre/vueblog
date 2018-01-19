<template>
  <main>
    <div v-if="loading"></div>

    <div v-else v-for="post in posts" :key="post.id">
      <h1 v-html="post.id"></h1>
      <div class="date" v-html="post.meta.date"></div>
      <div v-html="post.firstSentence"></div>
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
    highlight: function () {
      console.log('wrong')
    }
  },
  computed: {
    ...mapState(['posts'])
  },
  metaInfo () {
    return {
      title: 'Home',
      meta: [
        { hid: 'og:title', name: 'og:title', content: 'Home' },
        { hid: 'og:description', name: 'og:description', content: 'A simple blog written in vue.js using github gists.' },
        { hid: 'description', name: 'description', content: 'A simple blog written in vue.js using github gists.' }
      ]
    }
  }
}
</script>

<style>

</style>

<template>
  <main>
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-else-if="error">
      error: {{ error.statusCode }} - {{ error.message }}
    </div>
    <div v-else class="content" v-html="$store.state.currentPage.content">
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import hljs from 'highlight.js/lib/highlight'

['javascript', 'css', 'xml', 'php'].forEach((langName) => {
  const langModule = require(`highlight.js/lib/languages/${langName}`)
  hljs.registerLanguage(langName, langModule)
})

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
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    async fetchData () {
      this.loading = true
      try {
        console.log(this.$route.params.page_id)
        await this.$store.dispatch('FETCH_PAGE', this.$route.params.page_id)
      } catch (e) {
        this.error = { statusCode: 404, message: e.message }
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    ...mapState(['currentPage'])
  },
  updated () {
    const preTags = [...document.querySelectorAll('pre')]
    if (typeof hljs === 'object') {
      preTags.forEach(el => {
        hljs.highlightBlock(el)
      })
    }
  },
  metaInfo () {
    return {
      title: this.loading ? 'Loading ...' : this.$store.state.currentPage.meta.title,
      meta: this.loading ? [] : [
        { hid: 'og:title', name: 'og:title', content: this.currentPage.meta.title },
        { hid: 'og:description', name: 'og:description', content: this.currentPage.meta.description || this.currentPage.firstSentence },
        { hid: 'description', name: 'description', content: this.currentPage.meta.description || this.currentPage.firstSentence }
      ]
    }
  }
}
</script>

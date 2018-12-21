<template>
  <main>
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-else-if="error">
      error: {{ error.statusCode }} - {{ error.message }}
    </div>
    <div v-else-if="currentPost.meta.published === 'false'">
      Not visible.
    </div>
    <div v-else class="content">
      <h1>{{ currentPost.meta.title }}</h1>
      <p>
        <time v-if="currentPost.meta.date">{{ currentPost.meta.date | toLongDate }}</time>
      </p>
      <div v-html="currentPost.content"></div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import hljs from 'highlight.js/lib/highlight'

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
  mounted() {
    ['javascript', 'css', 'xml', 'php'].forEach((langName) => {
      const langModule = require(`highlight.js/lib/languages/${langName}`)
      hljs.registerLanguage(langName, langModule)
    })
  },
  methods: {
    async fetchData () {
      this.loading = true
      try {
        await this.$store.dispatch('FETCH_POST', this.$route.params.post_id)
      } catch (e) {
        this.error = { statusCode: 404, message: e.message }
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    ...mapState(['currentPost'])
  },
  updated () {
    const preTags = [...document.querySelectorAll('pre')]
    if (typeof hljs === 'object') {
      preTags.forEach(el => {
        hljs.highlightBlock(el)
      })
    }
    // UPDATE WITH CORS?
    const tweets = [...document.getElementsByClassName('media--tweet')]
    tweets.forEach((tweet) => {
      let url = tweet.innerHTML
      let id = tweet.getAttribute('id')
      let el = document.getElementById(`embed_${id}`)

      if(url) {
        axios.get(`https://api.twitter.com/1/statuses/oembed.json?url=${url}`)
            .then(response => {
              el.innerHTML = response.data.html
            })
      }

    })
  },
  metaInfo () {
    return {
      title: this.loading ? 'Loading ...' : this.$store.state.currentPost.meta.title,
      meta: this.loading ? [] : [
        { hid: 'og:title', name: 'og:title', content: this.currentPost.meta.title },
        { hid: 'og:description', name: 'og:description', content: this.currentPost.meta.description || this.currentPost.firstSentence },
        { hid: 'description', name: 'description', content: this.currentPost.meta.description || this.currentPost.firstSentence }
      ]
    }
  }
}
</script>

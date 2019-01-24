<template>
  <main>
    <div class="content">
      <h1>{{ currentPost.meta.title }}</h1>
      <p>
        <time v-if="currentPost.meta.date">{{ currentPost.meta.date | toLongDate }}</time>
      </p>
      <div v-html="currentPost.content"></div>
      <!-- <div id="temp"></div> -->
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import hljs from 'highlight.js/lib/highlight'

export default {
  name: 'Posts',
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  mounted() {
    ['javascript', 'css', 'xml', 'php'].forEach((langName) => {
          const langModule = require(`highlight.js/lib/languages/${langName}`)
          hljs.registerLanguage(langName, langModule)
    })
    // Add onclick to images.
    // TODO: Add a modal for showing larger images
    const imgs = [...document.querySelectorAll('img')]
    imgs.forEach(img => { img.onclick = () => { console.log(img.alt)}})

    const preTags = [...document.querySelectorAll('pre')]
    if (typeof hljs === 'object') {
      preTags.forEach(el => {
        hljs.highlightBlock(el)
      })
    }
    
    const tweets = [...document.getElementsByClassName('tweet')]
    tweets.forEach(tweet => {
      let identifier = tweet.id
      window.twttr.widgets.createTweet(
        identifier,
        document.getElementById(`embed_${identifier}`),
      )
    })
  },
  computed: {
    ...mapState(['currentPost'])
  } 
}
</script>

<template>
  <div class="content">
    <image-modal :img="img" v-if="img.src !== null" />
    <h1>{{ currentPost.meta.title }}</h1>
    <p>
      <time v-if="currentPost.meta.date">{{ currentPost.meta.date | toLongDate }}</time>
    </p>
    <div v-html="currentPost.content"></div>
    <!-- <div id="temp"></div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { EventBus } from '../../../event-bus'
import hljs from 'highlight.js/lib/highlight'
import imageModal from '../../ImageModal'

export default {
  name: 'Posts',
  components: { imageModal },
  data() {
    return {
      img: {
        src: null,
        alt: null,
      },
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  created() {
    EventBus.$on('image-modal-closed', () => {
      this.img.src = null
      this.img.alt = null
    })
  },
  mounted() {
    ['javascript', 'css', 'xml', 'php'].forEach((langName) => {
          const langModule = require(`highlight.js/lib/languages/${langName}`)
          hljs.registerLanguage(langName, langModule)
    })
    // Add onclick to images.
    const imgs = [...document.querySelectorAll('img')]
    imgs.forEach(img => { 
      img.onclick = () => { 
        this.img.alt = img.alt
        this.img.src = img.src
      }
    })

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

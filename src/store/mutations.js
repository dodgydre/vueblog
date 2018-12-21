import parser from './parser'
import { EventBus } from '../event-bus.js'

export default {
  SET_GIST (state, gist) {
    //console.log(gist)
    state.gist = gist
  },

  SET_CURRENT_PAGE (state, page) {
    state.currentPage = parser.parsePage(page)
  },

  SET_POSTS (state, posts) {
    state.posts = parser.parsePosts(posts)
  },

  SET_CURRENT_POST (state, post) {
    state.currentPost = parser.parsePost(post)
  },

  SET_PAGES (state, pages) {
    state.pages = pages
    EventBus.$emit('menu-updated', pages)
  }

}

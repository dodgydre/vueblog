import parser from './parser'
import { EventBus } from '../event-bus.js'

export default {
  SET_CURRENT_PAGE (state, page) {
    state.currentPage = parser.parsePage(page)
    EventBus.$emit('page-updated')
  },

  SET_POSTS (state, posts) {
    state.posts = parser.parsePosts(posts)
  },

  SET_PAGES (state, pages) {
    state.pages = pages // parser.parsePages(pages)
    EventBus.$emit('menu-updated', pages)
  }

}

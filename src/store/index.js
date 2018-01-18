import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { EventBus } from '../event-bus.js'
import config from '@/blog.config.js'
import Parser from './parser'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'
const gistId = config.gistId
const apiUrl = config.apiUrl

export default new Vuex.Store({
  state: {
  },
  actions: {
    // eslint-disable-next-line
    async FETCH_PAGE ({ commit, dispatch }, id) {
      const url = apiUrl + `/gists/${gistId}`
      const { data } = await axios.get(url)

      const files = data.files
      if (files.length === 0) {
        throw new Error('No Files Available')
      }

      const fileNames = Object.keys(files)
      const fileName = fileNames.find(name => name === `${id}.page.md`)
      if (!fileName) {
        throw new Error('Page not found')
      }
      const page = files[fileName]

      commit('SET_CURRENT_PAGE', page)
    }
  },
  mutations: {
    SET_CURRENT_PAGE (state, page) {
      state.currentPage = Parser.parsePage(page)
      EventBus.$emit('pageUpdated')
    }
  }
})

import axios from 'axios'
import config from '@/blog.config.js'

// const debug = process.env.NODE_ENV !== 'production'
const apiUrl = config.apiUrl
const gistId = config.gistId

export default {
  async FETCH_PAGE ({ commit, dispatch }, id) {
    const pages = {}
    const url = apiUrl + `/gists/${gistId}`
    const { data } = await axios.get(url)

    const files = data.files
    if (files.length === 0) {
      throw new Error('No Files Available')
    }

    const fileNames = Object.keys(files)

    fileNames.forEach(name => {
      if (name.endsWith('page.md')) {
        pages[name.split('.page.md')[0]] = files[name]
      }
    })

    const currentFile = fileNames.find(name => name === `${id}.page.md`)
    if (!currentFile) {
      throw new Error('Page not found')
    }
    const page = files[currentFile]

    commit('SET_CURRENT_PAGE', page)
    commit('SET_PAGES', pages)
  },
  async FETCH_POSTS ({ commit }) {
    const posts = []
    const pages = {}
    const url = apiUrl + `/gists/${gistId}`
    const { data } = await axios.get(url)

    const files = data.files
    if (files.length === 0) {
      throw new Error('No Files Available')
    }

    const fileNames = Object.keys(files)
    fileNames.filter(name => !name.endsWith('.draft.post.md'))
      .forEach(name => {
        if (name.endsWith('.post.md')) {
          posts.push(files[name])
        } else if (name.endsWith('page.md')) {
          pages[name.split('.page.md')[0]] = files[name]
        }
      })

    commit('SET_POSTS', posts, pages)
    commit('SET_PAGES', pages)
  }
}

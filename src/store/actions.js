import config from '@/blog.config.js'

const apiUrl = config.apiUrl
const gistId = config.gistId

export default {
  async FETCH_GIST (context) {
    const pages = []
    const posts = []

    const url = apiUrl + `/gists/${gistId}`
    const { data } = await window.axios.get(url)

    const files = data.files
    if (files.length === 0) {
      throw new Error('No Files Available')
    }

    const fileNames = Object.keys(files)

    fileNames.filter(name => !name.endsWith('.draft.post.md'))
      .forEach(name => {
        if (name.endsWith('.page.md')) {
          let tempPage = files[name]
          tempPage['id'] = tempPage['filename'].split('.page.md')[0]
          pages.push(tempPage)
        } else if (name.endsWith('.post.md')) {
          posts.push(files[name])
        }
      })

    context.commit('SET_GIST', data)
    context.commit('SET_POSTS', posts)
    context.commit('SET_PAGES', pages)
  },

  async FETCH_PAGE (context, id) {
    if (context.state.pages === undefined) {
      await context.dispatch('FETCH_GIST')
    }

    const fileNames = Object.keys(context.state.gist.files)
    const currentFile = fileNames.find(name => name === `${id}.page.md`)
    if (!currentFile) {
      throw new Error('Page not found')
    }
    const page = context.state.gist.files[currentFile]
    context.commit('SET_CURRENT_PAGE', page)
  },

  async FETCH_POSTS (context) {
    if (context.state.pages === undefined) {
      await context.dispatch('FETCH_GIST')
    }

    let tags = []
    context.state.posts.forEach(post => {
      post.meta.tags.forEach(tag => {
        tags.push(tag)
      })
    })
    tags = [...new Set(tags)]
    context.commit('SET_TAGS', tags)
  },

  async FETCH_POST (context, id) {
    if (context.state.pages === undefined) {
      await context.dispatch('FETCH_GIST')
    }

    const fileNames = Object.keys(context.state.gist.files)

    const currentFile = fileNames.find(name => name === `${id}.post.md`)
    if (!currentFile) {
      throw new Error('Page not found')
    }
    const post = context.state.gist.files[currentFile]

    context.commit('SET_CURRENT_POST', post)
  }
}

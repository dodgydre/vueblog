import showdown from 'showdown'

const converter = new showdown.Converter({
  tables: true,
  parseImgDimensions: true
})

// let Parser
// if (typeof DOMParser === 'undefined') {
//   Parser = require('xmldom').DOMParser
// } else {
//   Parser = DOMParser
// }

// const makeDOM = (html) => {
//   return new Parser().parseFromString(html, 'text/html')
// }

export default {
  parseItem (raw, split) {
    // meta section
    let meta = {}
    console.log(raw.content)
    raw.content
      .split(/\+\+\+\n/)[1]
      .trim()
      .split(/\n/)
      .forEach((item, index, object) => {
        meta[item.split(':')[0]] = item.split(':')[1].trim()
      })

    // content section
    let content = converter.makeHtml(raw.content.split(/\+\+\+\n/)[2])

    const segment = raw.filename.split(split)[0]
    const path = `/post/${segment}`
    const id = raw.filename.split(split)[0]
    content = content.replace(/<pre>/g, '<pre v-highlightjs>')

    const firstSentence = content.slice(3).split('.')[0] + '.'

    return {
      id,
      content,
      path,
      meta,
      firstSentence
    }
  },

  parsePage (rawHtml) {
    return this.parseItem(rawHtml, '.page.md')
  },

  parsePosts (files) {
    return files
      .filter(file => file.filename.includes('post.md'))
      .map(raw => this.parseItem(raw, '.post'))
      .sort((current, other) => new Date(other.meta.date) - new Date(current.meta.date))
      .filter(file => file.meta.published === 'true')
  },

  parsePages (files) {
    return files.forEach(file => {
      file.map(raw => this.parseItem(raw, '.page.md'))
    }).sort((current, other) => parseInt(other.meta.order) < parseInt(current.meta.order))
  },

  parsePost (rawHtml) {
    return this.parseItem(rawHtml, '.post.md')
  }
}

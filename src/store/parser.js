import showdown from 'showdown'

// (https://twitter.com/8bitfootball/status/1008450650936659974)
showdown.extension("twitter", function() {
  'use strict';
  return [
    {
      type: 'lang',
      filter: function(text, converter, options) {
        var mainRegex = new RegExp("(@tweet\(.*\))", "gm");
        text = text.replace(mainRegex, function(match, content) {
          let replacedContent = content.match(/(?:@tweet\()(.*)(?:\))/)[1];
          let identifier = content.match(/status\/([0-9]*)/)[1];
          
          //let embedUrl = `https://publish.twitter.com/oembed?url=${identifier}`;
          return `<div class="media--tweet" id="${identifier}" style="display:none">${replacedContent}</div><div class="media media--embed" id="embed_${identifier}"></div>`;
        });
        return text;
      }
    }
  ]
});



const converter = new showdown.Converter({
  tables: true,
  parseImgDimensions: true,
  extensions: ['twitter'],
})

export default {
  parseItem (raw, split) {
    // meta section
    let meta = {}
    //console.log(raw.content)
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

/* eslint-disable no-useless-escape */
import showdown from 'showdown'

// (https://twitter.com/8bitfootball/status/1008450650936659974)

showdown.extension("twitter", function() {
  'use strict';
  return [
    {
      type: 'lang',
      filter: function(text) {
        var mainRegex = new RegExp("(@tweet\(.*\))", "gm");
        text = text.replace(mainRegex, function(match, content) {
          let replacedContent = content.match(/(?:@tweet\()(.*)(?:\))/)[1];
          let identifier = content.match(/status\/([0-9]*)/)[1];

          //let embedUrl = `https://publish.twitter.com/oembed?url=${identifier}`;
          return `<div class="tweet" id="${identifier}" style="display:none">${replacedContent}</div><div class="media media--embed" id="embed_${identifier}"></div>`;

        });
        return text;
      }
    }
  ]
});

showdown.extension("youtube", function() {
  'use strict';
  return [
    {
      type: 'lang',
      filter: function(text) {
        var mainRegex = new RegExp("(@youtube\(.*\))", "gm");
        text = text.replace(mainRegex, function(match, content) {
          let identifier = content.match(/\(([A-Za-z0-9_\-]*)/)[1]
          return `<iframe id="ytplayer" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/${identifier}?autoplay=1&rel=0&showinfo=0" frameborder="0"></iframe>`;
        });
        return text;
      }
    }
  ]
});

const converter = new showdown.Converter({
  tables: true,
  parseImgDimensions: true,
  extensions: ['youtube', 'twitter'],
})

export default {
  parseItem (raw, split) {
    // meta section
    let meta = {}

    raw.content
      .split(/\+\+\+\n/)[1]
      .trim()
      .split(/\n/)
      .forEach((item) => {
        meta[item.split(':')[0]] = item.split(':')[1].trim()
      }
    )

    // Convert tags to an array
    if(meta.tags) {
      meta.tags = meta.tags.split(',').map(Function.prototype.call, String.prototype.trim)
    } else {
      meta.tags = []
    }

    // content section
    let content = converter.makeHtml(raw.content.split(/\+\+\+\n/)[2])

    const segment = raw.filename.split(split)[0]
    const path = `/post/${segment}`
    const id = raw.filename.split(split)[0]
    content = content.replace(/<pre>/g, '<pre v-highlightjs>')

    const firstSentence = content.slice(3).split('.')[0] + ' ... (click for more)'

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
    .filter(file => file.filename.includes('post.md')) // only posts, not pages
    .map(raw => this.parseItem(raw, '.post')) // parse to get the metas
    .sort((current, other) => new Date(other.meta.date) - new Date(current.meta.date)) // sort by date
    .filter(file => file.meta.published === 'true') // only get published ones
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

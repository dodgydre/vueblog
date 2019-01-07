// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/axios'
import App from './App'
import router from './router'
import store from './store'
import moment from 'moment'

window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {}
  if (d.getElementById(id)) return t
  js = d.createElement(s)
  js.id = id
  js.src = "https://platform.twitter.com/widgets.js"
  fjs.parentNode.insertBefore(js, fjs)

  t._e = [];
  t.ready = function(f) {
    t._e.push(f)
  };

  return t;
}(document, "script", "twitter-wjs"))

Vue.config.productionTip = false

Vue.filter('toLongDate', function (dateString) {
  const theDate = new Date(dateString)
  return moment(theDate).format('dddd, MMMM Do YYYY')
})
Vue.filter('toShortDate', function (dateString) {
  const theDate = new Date(dateString)
  return moment(theDate).format('MMMM Do YYYY')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

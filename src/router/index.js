import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import HelloWorld from '@/components/HelloWorld'
import Page from '@/components/Page'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  base: '/vueblog/',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/:page_id',
      name: 'Page',
      component: Page
    }
  ]
})

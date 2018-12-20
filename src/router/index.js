import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Posts from '@/components/Posts'
import Page from '@/components/Page'
import Post from '@/components/Post'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'development' ? '/' : '/vueblog/',
  routes: [
    { path: '/posts', redirect: '/' },
    {
      path: '/',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/:page_id',
      name: 'Page',
      component: Page
    },
    {
      path: '/posts/:post_id',
      name: 'Post',
      component: Post
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import VueMaterial from 'vue-material'
import JqueryComments from 'jquery-comments'

// COMPONENTS
import Home from 'components/Home'
import CoverSong from 'components/Cover_Song'
import Login from 'components/Login'

Vue.use(Router)
Vue.use(VueMaterial)
Vue.use(JqueryComments);

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/song',
    component: CoverSong
  }
]

export default new Router({
  mode: 'history',
  routes
})

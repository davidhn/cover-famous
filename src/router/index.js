import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
// import Discover from 'components/Discover'
import VueMaterial from 'vue-material'
import VueResource from 'vue-resource'
// import 'vue-material/dist/vue-material.css'
// import 'jquery-comments'
import JqueryComments from 'jquery-comments'
// import 'jquery-comments/css/jquery-comments.css'


Vue.use(Router)
Vue.use(VueMaterial)
Vue.use(VueResource);
Vue.use(JqueryComments);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    // {
    //   path: '/discover',
    //   name: 'Discover',
    //   component: Discover
    // }
  ]
})

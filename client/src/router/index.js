import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import AccidentInfo from '../components/accidents/Info.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Home
    },
    {
      path: '/accidents/:id',
      name: 'Information sur un accident',
      component: AccidentInfo
    }
  ]
})

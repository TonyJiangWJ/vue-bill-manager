import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tools from '@/components/Tools'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/tools',
      name: 'Tools',
      component: Tools
    },
    {
      path: '*',
      name: 'NotFound',
      component: HelloWorld
    }
  ]
})

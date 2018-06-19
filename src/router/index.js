import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TestList from '@/components/TestList'
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
      path: '/testList',
      name: 'TestList',
      component: TestList
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

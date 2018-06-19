import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TestList from '@/components/TestList'
import Tools from '@/components/Tools'
import T2Test from '@/components/tools/T2Test'

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
      component: Tools,
      children: [{
        path: '/tools/testList',
        name: 'testList',
        component: TestList
      },
      {
        path: '/tools/t2test',
        name: 'T2Test',
        component: T2Test
      }]
    },
    {
      path: '*',
      name: 'NotFound',
      component: HelloWorld
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tools from '@/components/Tools'
import T2Test from '@/components/tools/T2Test'
import CommonTools from '@/components/tools/CommonTools'
import JsonFormat from '@/components/tools/JsonFormat'
import SqlLogFormat from '@/components/tools/SqlLogFormat'
import Encryption from '@/components/tools/Encryption'
import Bills from '@/components/Bills'
import Assets from '@/components/bills/Assets'
import Login from '@/components/Login'

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
      component: Tools,
      children: [{
        path: '',
        name: 'CommonTools',
        component: CommonTools
      },
      {
        path: '/tools/jsonFormat',
        name: 'JsonFormat',
        component: JsonFormat
      },
      {
        path: '/tools/sqlLogFormat',
        name: 'SqlLogFormat',
        component: SqlLogFormat
      },
      {
        path: '/tools/encryption',
        name: 'Encryption',
        component: Encryption
      },
      {
        path: '/tools/t2test',
        name: 'T2Test',
        component: T2Test
      }]
    },
    {
      path: '/bills',
      component: Bills,
      children: [{
        path: '',
        name: 'Assets',
        component: Assets
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      name: 'NotFound',
      component: HelloWorld
    }
  ]
})

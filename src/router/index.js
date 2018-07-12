import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
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
import Register from '@/components/Register'
import AssetTypes from '@/components/AssetTypes'

import API from '@/js/api.js'
import { needLogin } from '@/js/config.js'

Vue.use(Router)

const router = new Router({
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
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/asset/type',
      name: 'AssetTypes',
      component: AssetTypes
    },
    {
      path: '*',
      name: 'NotFound',
      component: HelloWorld
    }
  ]
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  // ...
  if (needLogin.indexOf(to.path) > -1) {
    if (to.path === '/login') {
      next()
    } else {
      API.checkLoginStatus().then((resp) => {
        if (!resp || resp.code !== '0001') {
          next('/login')
        } else {
          next()
        }
      })
    }
  } else {
    next()
  }
})

router.afterEach(route => {
  iView.LoadingBar.finish()
})

export default router

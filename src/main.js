// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import App from './App'
import router from './router'
// 自定义全局方法
import DateUtil from '@/js/DateUtil'
import LogUtil from '@/js/LogUtil'

import 'iview/dist/styles/iview.css'
import './assets/css/layui.css'
import './assets/css/global.css'

iView.LoadingBar.config({
  color: '#00fdff'
})

Vue.config.productionTip = false
Vue.use(DateUtil)
Vue.use(LogUtil)
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

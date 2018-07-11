<template>
  <div class="layui-header header header-doc">
    <div class="layui-main">
      <!--<a href="javascript:void(0);">Schwifty!</a>-->
    </div>
    <div class="layui-form component">
      <div class="layui-form-select">
        <div class="layui-select-title">
          <input type="text" placeholder="search" value="" class="layui-input">
        </div>
      </div>
    </div>
    <ul class="layui-nav">
      <li class="layui-nav-item" :class="selected=='index'?'layui-this':''">
        <a href="#/">首页</a>
      </li>
      <li class="layui-nav-item" :class="selected=='tools'?'layui-this':''">
        <a href="#/tools">工具</a>
      </li>
      <li class="layui-nav-item" :class="selected=='bill'?'layui-this':''">
        <a href="#/bills">Bill<span class="layui-nav-more" :class="mouseOvered?'layui-nav-mored':''" @mouseover="hoverBillMenu" @mouseout="leaveBillMenu"></span></a>
        <dl class="layui-nav-child layui-anim layui-anim-upbit" :class="mouseOvered?'layui-show':''" @mouseover="hoverBillMenuItem" @mouseout="leaveBillMenuItem">
          <dd><a href="javascript:void(0);">账单</a></dd>
          <dd><a href="javascript:void(0);">资产列表</a></dd>
          <dd><a href="javascript:void(0);">支付宝账单上传</a></dd>
          <dd>
            <a v-if="logined" href="javascript:void(0);" @click="logout">退出登录</a>
            <a v-else href="javascript:void(0);" @click="goLogin">登录</a>
          </dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
import { logout } from '@/js/api'
export default {
  name: 'TopBar',
  data () {
    return {
      mouseOvered: false,
      itemMouseOvered: 0,
      get logined () {
        return window.localStorage.getItem('logined') === 'true'
      }
    }
  },
  computed: {
    selected: function () {
      if (this.$route.path.includes('bill')) {
        return 'bill'
      } else if (this.$route.path.includes('tools')) {
        return 'tools'
      } else {
        return 'index'
      }
    }
  },
  methods: {
    hoverBillMenu: function () {
      this.mouseOvered = true
    },
    leaveBillMenu: function () {
      var self = this
      setTimeout(function () {
        if (self.itemMouseOvered === 0) {
          self.mouseOvered = false
        }
      }, 500)
    },
    hoverBillMenuItem: function () {
      this.mouseOvered = true
      this.itemMouseOvered++
    },
    leaveBillMenuItem: function () {
      var self = this
      setTimeout(function () {
        self.itemMouseOvered--
        if (self.itemMouseOvered === 0) {
          self.mouseOvered = false
        }
      }, 200)
    },
    logout: function () {
      if (confirm('确定退出登录吗?')) {
        logout().then(resp => {
          if (resp.code === '0001') {
            window.localStorage.removeItem('logined')
          }
        })
      }
    },
    goLogin: function () {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.layui-nav-child {
  right: 0;
  left: auto;
}
.header .layui-nav {
  padding-right: 5px;
}
</style>

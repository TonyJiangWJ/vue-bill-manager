<template>
  <Menu theme="light" mode="horizontal" :active-name="selected" @on-select="clickedHome">
    <MenuItem name="index">
    <Icon type="ios-home" /> 首页
    </MenuItem>
    <MenuItem name="tools">
    <Icon type="ios-hammer-outline" /> 工具
    </MenuItem>
    <Submenu name="3">
      <template slot="title">
        <Icon type="ios-stats" /> 账单相关
      </template>
      <MenuGroup title="使用">
        <MenuItem name="bills">账单</MenuItem>
        <MenuItem name="3-2">资产列表</MenuItem>
        <MenuItem name="3-3">支付宝账单上传</MenuItem>
      </MenuGroup>
      <MenuGroup title="用户">
        <MenuItem v-if="logined" name="logout">退出登录</MenuItem>
        <MenuItem v-else name="goLogin">登录</MenuItem>
      </MenuGroup>
    </Submenu>
  </Menu>
</template>

<script>
import API from '@/js/api'
export default {
  name: 'TopBar',
  data () {
    return {
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
    clickedHome: function (name) {
      if (name === 'index') {
        this.$router.push('/')
      } else if (name === 'tools') {
        this.$router.push('/tools')
      } else if (name === 'bills') {
        this.$router.push('/bills')
      } else if (name === 'logout') {
        this.logout()
      } else if (name === 'goLogin') {
        this.goLogin()
      }
    },
    logout: function () {
      if (confirm('确定退出登录吗?')) {
        API.logout().then(resp => {
          if (resp.code === API.CODE_CONST.SUCCESS) {
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

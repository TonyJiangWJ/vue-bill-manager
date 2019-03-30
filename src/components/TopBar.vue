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
        <MenuItem name="budgetManage">预算管理</MenuItem>
        <MenuItem name="assetList">资产列表</MenuItem>
        <MenuItem name="alipayUpload">支付宝账单上传</MenuItem>
      </MenuGroup>
      <MenuGroup title="用户">
        <MenuItem v-if="isLogin" name="logout">退出登录</MenuItem>
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
      logined: false,
      get isLogin () {
        this.logined = window.localStorage.getItem('logined') === 'true'
        return this.logined
      }
    }
  },
  computed: {
    selected: function () {
      if (this.$route.path.includes('bill') || this.$route.path.includes('asset')) {
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
        this.$router.push('/bill/record/list')
      } else if (name === 'budgetManage') {
        this.$router.push('/bill/budget')
      } else if (name === 'assetList') {
        this.$router.push('/assetList')
      } else if (name === 'alipayUpload') {
        this.$router.push('/bill/alipay/upload')
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
            this.logined = false
            this.$router.push('/login')
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

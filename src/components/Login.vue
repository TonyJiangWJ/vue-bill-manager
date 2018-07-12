<template>
    <div class="layui-container">
      <div v-if="!logined">
        <div class="layui-form login-container">
            <div class="layui-form-item">
                <label class="layui-form-label">用户名</label>
                <div class="layui-input-inline">
                    <input type="text" class="layui-input" name="userName" v-model="userName" placeholder="用户名"/>
                </div>
                <span v-if="showUserNameError" class="error">请输入用户名</span>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">密码</label>
                <div class="layui-input-inline">
                    <input type="password" class="layui-input" name="password" v-model="password" placeholder="密码"/>
                </div>
                <span v-if="showPwdError" class="error">密码最短6位</span>
            </div>
            <div v-if="loginError" class="layui-form-item">
              <span class="error">账号或密码错误</span>
            </div>
            <button class="layui-btn layui-btn-radius" style="width: 100%;" @click="doLogin">登录</button>
        </div>
    </div>
    <div v-else>
      <div class="layui-form login-container">
        <div class="layui-form-item">
          <button class="layui-btn layui-btn-radius" style="width: 100%;" @click="logout">退出登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/js/api'
export default {
  name: 'Login',
  data () {
    return {
      showUserNameError: false,
      showPwdError: false,
      loginError: false,
      userName: '',
      password: '',
      logined: false
    }
  },
  methods: {
    doLogin: function () {
      if (!this.password || this.password.length < 6) {
        this.showPwdError = true
      } else {
        this.showPwdError = false
      }
      if (!this.userName) {
        this.showUserNameError = true
      } else {
        this.showUserNameError = false
      }
      if (this.showUserNameError || this.showPwdError) {
        return
      }
      let data = {}
      data.userName = this.userName
      data.password = this.password
      API.login(data).then((resp) => {
        if (resp.code === '0001') {
          this.debug('登录成功')
          this.loginError = false
          this.$router.push('/')
        } else {
          this.debug('登录失败')
          this.loginError = true
        }
      })
    },
    logout: function () {
      API.logout().then((resp) => {
        this.debug('退出成功')
        this.logined = false
      })
    }
  },
  created () {
    API.checkLoginStatus().then((resp) => {
      if (resp.code === '0001') {
        this.logined = true
      } else {
        this.logined = false
      }
    })
  }
}
</script>
<style>
.error {
  color: red;
  font-size: 0.25rem;
  display: block;
  padding: 9px 15px;
  width: 80px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
}
.login-container {
  margin: 60px auto 0;
  max-width: 400px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  padding: 50px 50px 30px;
}
</style>

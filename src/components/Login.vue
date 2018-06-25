<template>
    <div class="layui-container">
      <div>
        <div style="margin: 60px auto 0;max-width: 400px;box-shadow: 0 0 8px rgba(0,0,0,.1);padding: 50px 50px 30px;"
             class="layui-form">
            <div class="layui-form-item">
                <label class="layui-form-label">用户名</label>
                <div class="layui-input-inline">
                    <input type="text" class="layui-input" name="userName" id="userName" placeholder="用户名"/>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">密码</label>
                <div class="layui-input-inline">
                    <input type="password" class="layui-input" name="password" id="password" placeholder="密码"/>
                </div>
            </div>
            <button class="layui-btn layui-btn-radius" style="width: 100%;" @click="doLogin">登录</button>
        </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/js/api'
export default {
  name: 'Login',
  data () {
    return {
      showUserNameError: false,
      showPwdError: false,
      userName: '',
      password: ''
    }
  },
  methods: {
    doLogin: () => {
      if (!this.userName) {
        this.showUserNameError = true
      }
      if (!this.password || this.password.length < 6) {
        this.showPwdError = true
      }
      let data = {
        userName: this.userName,
        password: this.pasword
      }
      login(data).then((resp) => {
        if (resp.code === '0001') {
          console.log('登录成功')
        } else {
          console.log('登录失败')
        }
      })
    }
  }
}
</script>

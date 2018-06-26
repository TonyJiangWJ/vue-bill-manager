<template>
    <div class="layui-container">
      <div>
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
            <div class="layui-form-item">
                <label class="layui-form-label">重复密码</label>
                <div class="layui-input-inline">
                    <input type="password" class="layui-input" name="confirmPwd" v-model="confirmPwd" placeholder="密码"/>
                </div>
                <span v-if="showConfirmPwdError" class="error">密码不一致</span>
            </div>
            <div v-if="registerError" class="layui-form-item">
              <span class="error">注册失败</span>
            </div>
            <button class="layui-btn layui-btn-radius" style="width: 100%;" @click="doRegister">注册</button>
        </div>
    </div>
  </div>
</template>

<script>
import { checkLoginStatus } from '@/js/api'
export default {
  name: 'Login',
  data () {
    return {
      showUserNameError: false,
      showPwdError: false,
      showConfirmPwdError: false,
      registerError: false,
      userName: '',
      password: '',
      confirmPwd: ''
    }
  },
  methods: {
    doRegister: function () {
      this.showUserNameError = !this.userName
      this.showPwdError = !this.password || this.password.length < 6
      this.showConfirmPwdError = !this.confirmPwd
    }
  },
  created () {
    checkLoginStatus().then((resp) => {
      if (resp.code === '0001') {
        this.$router.push('/login')
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

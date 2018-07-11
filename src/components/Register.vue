<template>
    <div class="layui-container">
      <div>
        <div class="layui-form login-container">
            <div class="layui-form-item">
                <label class="layui-form-label">用户名</label>
                <div class="layui-input-inline">
                  <Tooltip content="请输入用户名" placement="right" :disabled="!showUserNameError" :always="showUserNameError">
                    <input type="text" class="layui-input" name="userName" v-model="userName" placeholder="用户名"/>
                  </Tooltip>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">密码</label>
                <div class="layui-input-inline">
                  <Tooltip content="密码最短6位" placement="right" :disabled="!showPwdError" :always="showPwdError">
                    <input type="password" class="layui-input" name="password" v-model="password" placeholder="密码"/>
                  </Tooltip>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">重复密码</label>
                <div class="layui-input-inline">
                  <Tooltip content="密码不一致" placement="right" :disabled="!showConfirmPwdError" :always="showConfirmPwdError">
                    <input type="password" class="layui-input" name="confirmPwd" v-model="confirmPwd" placeholder="密码"/>
                  </Tooltip>
                </div>
            </div>
            <div v-if="registerError" class="layui-form-item">
              <span class="error">注册失败</span>
            </div>
            <div class="button_container">
              <button class="layui-btn layui-btn-radius" style="width: 100%;" @click="doRegister">注册</button>
            </div>
            <div class="button_container">
              <button class="layui-btn layui-btn-radius layui-btn-primary" style="width: 100%;" @click="goLogin">已有账号，前往登录</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { checkLoginStatus, register } from '@/js/api'
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
      let flag = 0
      flag += this.checkUserName() ? 1 : 0
      flag += this.checkPwd() ? 1 : 0
      flag += this.checkConfirmPwd() ? 1 : 0
      if (flag === 3) {
        let data = {
          userName: this.userName,
          password: this.password
        }
        this.debug('request:' + JSON.stringify(data))
        register(data).then(resp => {
          if (resp.code === '0001') {
            alert('注册成功，前往登录')
            this.$router.push('/login')
          } else {
            alert('注册失败.' + resp.msg)
          }
        })
      }
    },
    checkUserName: function () {
      this.showUserNameError = !this.userName
      return !this.showUserNameError
    },
    checkPwd: function () {
      this.showPwdError = !this.password || this.password.length < 6
      return !this.showPwdError
    },
    checkConfirmPwd: function () {
      this.showConfirmPwdError = !this.confirmPwd || this.confirmPwd !== this.password
      return !this.showConfirmPwdError
    },
    goLogin: function () {
      this.$router.push('/login')
    }
  },
  created () {
    checkLoginStatus().then((resp) => {
      if (resp.code === '0001') {
        this.$router.push('/login')
      }
    })
  },
  watch: {
    userName: function () {
      this.checkUserName()
    },
    password: function () {
      this.checkPwd()
    },
    confirmPwd: function () {
      this.checkConfirmPwd()
    }
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
.button_container {
  margin: 5px;
}

.layui-form-label {
  width: 100px;
}

.ivu-tooltip-popper[x-placement^="right"] .ivu-tooltip-arrow {
  border-right-color: rgba(133, 134, 133, 0.82);
}

.ivu-tooltip-inner {
  background-color: rgba(133, 134, 133, 0.82);
}
</style>

import axios from 'axios'
import qs from 'qs'
import JSEncrypt from 'JSEncrypt'
import {
  host,
  rsaPubKey
} from '@/js/config.js'

// 允许跨域携带cookie
axios.defaults.withCredentials = true

export function requestAssetManage () {
  return sendAjax('/bootDemo/asset/manage', {})
}

export function login (data) {
  data.password = getRsaCipher(data.password, rsaPubKey)
  return sendAjax('/bootDemo/user/login', data)
}

export function logout () {
  return sendAjax('/bootDemo/user/logout', {})
}

export function checkLoginStatus () {
  return axios.post(`${host}/bootDemo/login/status`)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch(errorLog)
}

/**
 * rsa加密
 * @param str 待加密文本
 * @param pubKey rsa公钥
 * @returns {string|*|PromiseLike<ArrayBuffer>}
 */
function getRsaCipher (str, pubKey) {
  var encrypt = new JSEncrypt()
  encrypt.setPublicKey(pubKey)
  var timestamp = new Date().getTime()
  return encrypt.encrypt(timestamp + str)
}

function errorLog (e) {
  console.log('error' + e)
}

// 发送ajax请求
function sendAjax (url, data) {
  return axios.post(`${host}${url}`, qs.stringify(data))
    .then((response) => {
      if (response.data.code === '0006') {
        console.log('未登录')
        window.location.href = '#/login'
      } else {
        return Promise.resolve(response.data)
      }
    })
    .catch(errorLog)
}

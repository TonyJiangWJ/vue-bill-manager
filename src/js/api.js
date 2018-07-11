import axios from 'axios'
import qs from 'qs'
import JSEncrypt from 'JSEncrypt'
import iView from 'iview'
import {
  host,
  rsaPubKey
} from '@/js/config.js'
import { debug } from '@/js/LogUtil'

// 允许跨域携带cookie
axios.defaults.withCredentials = true

export function requestAssetManage () {
  return sendAjax('/bootDemo/asset/manage', {})
}

export function login (data) {
  data.password = getRsaCipher(data.password, rsaPubKey)
  return sendAjax('/bootDemo/user/login', data)
}

export function register (data) {
  data.password = getRsaCipher(data.password, rsaPubKey)
  return sendAjax('/bootDemo/user/register/put', data)
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

export function updateAsset (data) {
  return sendAjax('/bootDemo/asset/update', data)
}

export function updateLiability (data) {
  return sendAjax('/bootDemo/liability/update', data)
}

export function getLiabilityParents () {
  return sendAjax('/bootDemo/list/asset/parent/types/L')
}

export function getAssetParents () {
  return sendAjax('/bootDemo/list/asset/parent/types/A')
}

export function addAssetType (data) {
  return sendAjax('/bootDemo/asset/types/put', data)
}

export function getChildByParent (data) {
  return sendAjax('/bootDemo/list/asset/type/by/parent/id', data)
}

export function addLiability (data) {
  return sendAjax('/bootDemo/liability/put', data)
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
  iView.LoadingBar.error()
  debug('error' + e)
}

// 发送ajax请求
function sendAjax (url, data) {
  debug('request data:' + JSON.stringify(data))
  iView.LoadingBar.start()
  return axios.post(`${host}${url}`, qs.stringify(data))
    .then((response) => {
      if (response.data.code === '0006') {
        debug('未登录')
        iView.LoadingBar.finish()
        window.location.href = '#/login'
      } else {
        iView.LoadingBar.finish()
        if (response.data) {
          return Promise.resolve(response.data)
        } else {
          errorLog('请求失败' + JSON.stringify(response))
        }
      }
    })
    .catch(errorLog)
}

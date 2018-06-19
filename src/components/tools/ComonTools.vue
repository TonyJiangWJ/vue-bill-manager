<template>
  <div>
    <div id="common_tools" class="layui-row layui-col-space5">
      <div class="layui-col-md2"></div>
      <div class="layui-col-md8">
          <table class="t-table">
              <thead>
              <tr>
                  <td><h3>工具名称</h3></td>
                  <td>
                      <table>
                          <tbody>
                          <tr>
                              <td><h4>当前时间:</h4></td>
                          </tr>
                          <tr>
                              <td><span>{{nowDateTime}}</span></td>
                          </tr>
                          </tbody>
                      </table>
                  </td>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td><span>时间转换</span></td>
                  <td>Timestamp13:</td>
                  <td><input class="layui-input" type="number" v-model="Timestamp13"></td>
                  <td>
                      <button class="layui-btn" @click="ttString">转换字符串</button>
                  </td>
              </tr>
              <tr>
                  <td></td>
                  <td>TimeString:</td>
                  <td><input class="layui-input" type="text" v-model="TimeString"></td>
                  <td>
                      <button class="layui-btn" @click="ttStamp">转换时间戳</button>
                  </td>
              </tr>
              <tr>
                  <td><span>urlEncode转换</span></td>
                  <td>普通字符串</td>
                  <td><input class="layui-input" type="text" v-model="simpleStr" title=""></td>
                  <td>
                      <button class="layui-btn" @click="doEncode">转换字符串</button>
                  </td>
              </tr>
              <tr>
                  <td></td>
                  <td>URL编码字符串</td>
                  <td><input class="layui-input" type="text" v-model="encodeStr"></td>
                  <td>
                      <button class="layui-btn" @click="doDecode">解码字符串</button>
                  </td>
              </tr>
              <tr>
                  <td><span>Unicode转换</span></td>
                  <td>
                    <textarea class="layui-textarea" placeholder="unicode" v-model="unicodeStr"
                                style="height: 100px;"></textarea>
                  </td>
                  <td>
                    <textarea class="layui-textarea" placeholder="converted" v-model="convertedStr"
                                style="height: 100px;"></textarea>
                  </td>
                  <td>
                      <table>
                          <tr>
                              <td>
                                  <button class="layui-btn" @click="convert">解码</button>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <button class="layui-btn" @click="backUnicode">编码</button>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td><span v-bind="displayDays"></span></td>
                  <td>
                      <div>
                          <input class="layui-input" placeholder="开始时间" v-model="startDate" type="text">
                      </div>
                  </td>
                  <td>
                      <div>
                          <input class="layui-input" placeholder="结束时间" v-model="endDate" type="text">
                      </div>
                  </td>
                  <td>
                      <button class="layui-btn" @click="calDayBtw">计算时间间隔</button>
                  </td>
              </tr>
              <tr>
                  <td></td>
                  <td><input class="layui-input" type="number" v-model="daysBtw" placeholder="间隔时间"></td>
                  <td>
                      <button class="layui-btn" @click="calTargetDate">计算目标日期</button>
                  </td>
              </tr>
              <tr>
                  <td><span>MD5加密</span></td>
                  <td><input class="layui-input" type="text" v-model="md5source" placeholder="明文"></td>
                  <td><input class="layui-input" type="text" v-model="md5_32" placeholder="md5 32位"
                            @dblclick="toggleMd32Case">
                  </td>
                  <td>
                      <button class="layui-btn" @click="encodeMd5">加密</button>
                  </td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td><input class="layui-input" type="text" v-model="md5_16" placeholder="md5 16位"
                            @dblclick="toggleMd16Case">
                  </td>
              </tr>
              <tr>
                  <td><span>Base64加解密</span></td>
                  <td><input class="layui-input" type="text" v-model="base64Source" placeholder="明文"></td>
                  <td><input class="layui-input" type="text" v-model="encoded64" placeholder="密文"></td>
                  <td>
                      <button class="layui-btn" @click="encodeBase64">加密</button>
                      <button class="layui-btn" @click="decodeBase64">解密</button>
                  </td>
              </tr>
              <tr>
                  <td><span>RSA加密</span></td>
                  <td colspan="2"><textarea style="height: 200px;" placeholder="publicKey" class="layui-input" type="text"
                                            v-model="publicKey"></textarea></td>
                  <td>
                      <button class="layui-btn" @click="generateRsaKeys">生成密钥</button>
                  </td>
              </tr>
              <tr>
                  <td></td>
                  <td colspan="2"><textarea style="height: 300px;" placeholder="privateKey" class="layui-input"
                                            type="text" v-model="privateKey"></textarea></td>
              </tr>
              <tr>
                  <td></td>
                  <td><textarea class="layui-textarea" style="height: 100px;" placeholder="明文"
                                v-model="rsaDecryptContent"></textarea></td>
                  <td><textarea class="layui-textarea" style="height: 100px;" placeholder="密文"
                                v-model="rsaEncryptContent"></textarea></td>
                  <td>
                      <button class="layui-btn" @click="pubEncryptRsa">公钥加密</button>
                      <button class="layui-btn" @click="priDecryptRsa">私钥解密</button>
                  </td>
              </tr>
              <tr>
                  <td><span>论文复制</span></td>
                  <td><textarea class="layui-textarea" style="height: 100px;" placeholder="原文" v-model="srcStr"></textarea>
                  </td>
                  <td><textarea class="layui-textarea" style="height: 100px;" placeholder="处理后" v-model="destStr"></textarea>
                  </td>
                  <td>
                      <button class="layui-btn" @click="escapeForCN">中文去空格</button>
                      <button class="layui-btn" @click="escapeForEN">英文去回车</button>
                  </td>
              </tr>
              </tbody>
          </table>
      </div>
    <div class="layui-col-md2"></div>
  </div>
</template>

<script>
export default {
  name: 'CommonTools',
  data () {
    return {
      srcStr: ''
    }
  }
}
</script>

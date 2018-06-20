<template>
  <div class="layui-row layui-col-space5">
    <div class="layui-col-md2"></div>
    <div class="contain layui-col-md8">
        <div>
            <label>密文：</label>
            <button class="clip-btn layui-btn layui-btn-xs layui-btn-primary" :data-clipboard-text="encryptedStr">点我复制
            </button>
            <textarea placeholder="密文" style="height: 5rem" v-model="encryptedStr"></textarea>
        </div>
        <div>
            <label>明文：</label>
            <textarea placeholder="明文" style="height: 3rem"
                      v-model="decryptedStr"
            ></textarea>
        </div>
        <div>
            <button @click="encrypt" class="layui-btn layui-btn-xs">加密</button>
            <button @click="decrypt" class="layui-btn layui-btn-xs">解密</button>
        </div>
        <div>
            <label>对方的公钥：</label>
            <textarea placeholder="对方的公钥" style="height: 5rem" v-model="targetPubKey"></textarea>
        </div>
        <div>
            <button @click="generateKeys" class="layui-btn layui-btn-xs layui-btn-danger">生成密钥对</button>
        </div>
        <div>
            <label>我的公钥：</label>
            <button class="clip-btn layui-btn layui-btn-xs layui-btn-primary" :data-clipboard-text="myPubKey">点我复制
            </button>
            <textarea placeholder="我的公钥" style="height: 5rem" readonly v-model="myPubKey"></textarea>
        </div>
        <div>
            <label>我的私钥：</label>
            <button class="layui-btn layui-btn-xs layui-btn-primary" style="float: left;margin-bottom: 2px" @click="togglePrivateKey">{{privateKeyStatus?'隐藏':'显示'}}</button>
            <textarea placeholder="我的私钥" :style="'height: 8rem; '+(privateKeyStatus?'':'display:none')" readonly v-model="myPrivateKey"></textarea>
        </div>
    </div>
    <div class="layui-col-md2"></div>
</div>
</template>

<script>
import JSEncrypt from 'JSEncrypt'
import ClipboardJS from 'clipboard'

export default {
  name: 'Encryption',
  data () {
    return {
      encryptedStr: '',
      decryptedStr: '',
      targetPubKey: '',
      myPubKey: '',
      myPrivateKey: '',
      privateKeyStatus: false
    }
  },
  methods: {
    generateKeys: function () {
      var flag = true
      if (this.myPrivateKey) {
        if (!confirm('确定生成新的密钥对吗？此操作之后原先的加密内容将无法解密')) {
          flag = false
        }
      }
      if (flag) {
        console.log('生成密钥对')
        var encrypt = new JSEncrypt()
        this.myPubKey = encrypt.getPublicKey()
        this.myPrivateKey = encrypt.getPrivateKey()
      }
    },
    encrypt: function () {
      console.log('加密')
      var encrypt = new JSEncrypt()
      if (this.targetPubKey) {
        encrypt.setPublicKey(this.targetPubKey)

        var contents = this.decryptedStr
        var contentArray = []
        while (contents.length > 117) {
          contentArray.push(contents.substring(0, 117))
          contents = contents.substring(117)
        }
        if (contents.length > 0) {
          contentArray.push(contents)
        }
        var result = ''
        for (var i = 0; i < contentArray.length; i++) {
          result += encrypt.encrypt(contentArray[i])
          if (i < contentArray.length - 1) {
            result += ''
          }
        }

        this.encryptedStr = result
        console.log('明文：' + this.decryptedStr + '结果：' + this.encryptedStr)
      } else {
        alert('请输入对方的公钥')
      }
    },
    decrypt: function () {
      console.log('解密')
      if (this.myPrivateKey) {
        var encrypt = new JSEncrypt()
        encrypt.setPrivateKey(this.myPrivateKey)

        var encryptContents = this.encryptedStr
        var contentArray = encryptContents.split(';')
        var result = ''
        for (var i = 0; i < contentArray.length; i++) {
          result += encrypt.decrypt(contentArray[i])
          if (result === 'false') {
            alert('请检查传递给对方的公钥是否正确')
            return
          }
        }
        this.decryptedStr = result
        if (this.decryptedStr === false) {
          alert('请检查传递给对方的公钥是否正确')
        }
      } else {
        alert('请先生成本地密钥对')
      }
    },
    togglePrivateKey: function () {
      this.privateKeyStatus = !this.privateKeyStatus
    }
  },
  mounted () {
    var clipboard = new ClipboardJS('.clip-btn')

    clipboard.on('success', function (e) {
      console.log('复制成功')
    })
  }

}
</script>

<style>
.contain {
    text-align: center;
}

.contain > div {
    margin: 5px 5px;
}

.contain > div > label {
    display: block;
    float: left;
}

.contain > div > textarea {
    resize: none;
    width: 100%;
}

.clip-btn {
    float: left;
    margin: -2px 2px 2px 2px;
}
</style>

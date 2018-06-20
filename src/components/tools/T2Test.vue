<template>
  <div class="t2-table">
    <table class="t-table">
        <thead>
        <tr>
            <td>
                服务地址
            </td>
            <td>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <input class="layui-input" placeholder="host" v-model="host" type="text"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input class="layui-input" placeholder="port" v-model="port" type="text"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
            <td>
                <button class="layui-btn layui-btn-normal" @click="getAllConnect">查看所有连接</button>
            </td>
            <td>
              <button class="layui-btn layui-btn-normal" @click="getAllService">查看所有服务</button>
            </td>
            <td>
              <button class="layui-btn layui-btn-normal" @click="checkAll">测试服务列表</button>
            </td>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>
                接口
            </td>
            <td>
                <input placeholder="functionId" class="layui-input" v-model="functionId" type="text"/>
            </td>
            <td>
                <button class="layui-btn layui-btn-normal" @click="checkFunc">测试接口</button>
            </td>
        </tr>
        <tr>
            <td>
                <button class="layui-btn layui-btn-normal" @click="refresh">刷新</button>
            </td>
        </tr>
        </tbody>
    </table>
    <iframe :src="testServerUrl" width="100%" height="800px"></iframe>
  </div>
</template>

<script>
export default {
  name: 'T2Test',
  data () {
    return {
      host: '',
      port: '',
      functionId: '',
      testServerUrl: '',
      defaultHost: '127.0.0.1',
      checkFunction: '/common/cep?functionId=',
      showService: '/manager/cep?pluginId=jres.cepcore&commandName=queryProcServices',
      showConnection: '/manager/cep?pluginId=jres.t2channel&commandName=queryAllConnections'
    }
  },
  methods: {
    getAllConnect: function () {
      this.testServerUrl = this.getHost() + this.port + this.showConnection
    },
    getAllService: function () {
      this.testServerUrl = this.getHost() + this.port + this.showService
    },
    checkAll: function () {
      this.testServerUrl = this.getHost() + this.port + '/unittest/cep?cmdId=all'
    },
    checkFunc: function () {
      this.testServerUrl = this.getHost() + this.port + this.checkFunction + this.funcId
    },
    refresh: function () {
      var target = this.testServerUrl
      this.testServerUrl = ''
      setTimeout(function () {
        this.testServerUrl = target
      }, 120)
    },
    getHost () {
      if (this.host) {
        return 'http://' + this.host + ':'
      } else {
        return 'http://' + this.defaultHost + ':'
      }
    }
  }
}
</script>

<style>
.t2-table {
  padding: 20px;
}
</style>

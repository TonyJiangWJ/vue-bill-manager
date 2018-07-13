<template>
  <div>
    <div id="sqlLogConvert" class="layui-row layui-col-space5">
    <div class="layui-col-md2"></div>
    <div class="layui-col-md8">
        <table class="t-table">
            <thead>
            <tr>
                <td>
                    <h2>iBatis/MyBatis日志分析工具（一次分析一条完整数据）</h2>
                </td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <textarea class="t-textarea t-textarea-source" placeholder="source" v-model="sqlSourceStr"></textarea>
                </td>
            </tr>
            <tr>
                <td>
                    <textarea class="t-textarea t-textarea-target" placeholder="target" v-model="sqlResultStr"></textarea>
                </td>
            </tr>
            <tr>
                <td>
                    <button style="float: left;margin: 2px;" class="layui-btn" @click="convertSql">转换日志</button>
                    <button class="layui-btn clip-btn layui-btn-primary" :data-clipboard-text="sqlResultStr">点我复制结果
                    </button>
                </td>
            </tr>
            </tbody>

        </table>
    </div>
    <div class="layui-col-md2"></div>
</div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'
export default {
  name: 'SqlLogFormat',
  data () {
    return {
      sqlSourceStr: '',
      sqlResultStr: ''
    }
  },
  methods: {
    convertSql: function () {
      var source = this.sqlSourceStr
      try {
        var sql = /.*Preparing.*:(.*)>?/.exec(source)[1].trim().replace(/\s+/g, ' ')
        var params = /Parameters:\s*\[(.*)]/.exec(source)[1]
        var paramsList = params.split(/,[\s]*/)
        for (var i = 0; i < paramsList.length; i++) {
          var param = paramsList[i]
          sql = sql.replace(/\?/, '\'' + param + '\'').replace(/limit.*'(\d+)',.*'(\d+)'/, 'limit $1, $2').replace(/>$/, '')
        }
        this.debug(sql)
        this.sqlResultStr = sql
      } catch (e) {
        this.debug(e)
        this.sqlResultStr = '请确认复制的内容包含完整的Preparing和Parameters信息'
      }
    }
  },
  mounted () {
    var clipboard = new ClipboardJS('.clip-btn')

    clipboard.on('success', function (e) {
      console.info('Action:', e.action)
      console.info('Text:', e.text)
      console.info('Trigger:', e.trigger)
      e.clearSelection()
    })
  }
}
</script>

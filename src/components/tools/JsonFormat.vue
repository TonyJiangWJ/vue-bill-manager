<template>
  <div id="jsonFormat" class="layui-row layui-col-space5">
      <div class="layui-col-md2"></div>
      <div class="layui-col-md8">
          <table class="t-table">
              <thead>
              <tr>
                  <td>
                      <h2>JSON格式化校验工具</h2>
                  </td>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td>
                      <textarea class="t-textarea t-textarea-source" placeholder="source" v-model="sourceStr"></textarea>
                  </td>
              </tr>
              <tr>
                  <td>
                      <textarea class="t-textarea t-textarea-target" placeholder="target" v-model="targetStr"></textarea>
                  </td>
              </tr>
              <tr>
                  <td>
                      <button class="layui-btn" @click="checkJson">格式化校验</button>
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
  name: 'JsonFormat',
  data () {
    return {
      sourceStr: '',
      targetStr: ''
    }
  },
  methods: {
    checkJson: function () {
      var json = JSON.object
      try {
        json = JSON.parse(this.sourceStr)
        this.targetStr = JSON.stringify(json, null, 4)
      } catch (e) {
        this.targetStr = '非法JSON字符串'
      }
    }
  }
}
</script>

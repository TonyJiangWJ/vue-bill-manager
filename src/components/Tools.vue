<template>
  <div>
    <div class="layui-main center">
      <span class="layui-breadcrumb">
        <a href="#t2_test" onclick="showT2Test();">T2测试接口</a>|
        <a href="#common_tools" onclick="showCommonTools();">通用工具</a>|
        <a href="#jsonFormat" onclick="showJsonFormat();">JSON格式化工具</a>|
        <a href="#sqlLogConvert" onclick="showSqlLogConvert();">iBatis/MyBatis日志转换</a>|
        <a href="#encryption-app" onclick="showEncryption();">基础加密通信</a>
      </span>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'

export default {
  name: 'Tools',
  components: {
    TopBar
  },
  data () {
    return {}
  },
  mounted () {
    TopBar.selected = 'tools'
  }
}
</script>

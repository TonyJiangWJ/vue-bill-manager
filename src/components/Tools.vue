<template>
  <div>
    <div class="layui-main center">
      <span class="lay-span">
        <router-link to="/tools/">通用工具</router-link><span>|</span>
        <router-link to="/tools/jsonFormat">JSON格式化工具</router-link><span>|</span>
        <router-link to="/tools/sqlLogFormat">iBatis/MyBatis日志转换</router-link><span>|</span>
        <router-link to="/tools/encryption">基础加密通信</router-link><span>|</span>
        <router-link to="/tools/t2test">T2测试接口</router-link>
      </span>
    </div>
    <div class="tool-container">
      <router-view></router-view>
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
  methods: {
    jumpList: function () {
      this.$router.push({path: '/tools/testList'})
    }
  },
  mounted () {
    TopBar.selected = 'tools'
  }
}
</script>

<style>
  .lay-span span {
    margin: 0 10px;
    color: #999;
  }

  .lay-span a {
    color: #999;
  }

  .tool-container {
    padding: 20px 10px;
  }
</style>

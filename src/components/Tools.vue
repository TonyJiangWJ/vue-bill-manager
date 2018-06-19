<template>
  <div>
    <div class="layui-main center">
      <span class="lay-span">
        <a href="javascript:void(0);" @click="jumpList">测试列表</a><span>|</span>
        <router-link to="/tools/t2test">T2测试接口</router-link><span>|</span>
        <a href="javascript:void(0);">通用工具</a><span>|</span>
        <a href="javascript:void(0);">JSON格式化工具</a><span>|</span>
        <a href="javascript:void(0);">iBatis/MyBatis日志转换</a><span>|</span>
        <a href="javascript:void(0);">基础加密通信</a>
      </span>
    </div>
    <div>
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
</style>

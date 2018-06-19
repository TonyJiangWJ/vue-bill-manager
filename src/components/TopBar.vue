<template>
  <div class="layui-header header header-doc">
    <div class="layui-main">
      <!--<a href="javascript:void(0);">Schwifty!</a>-->
    </div>
    <div class="layui-form component">
      <div class="layui-form-select">
        <div class="layui-select-title">
          <input type="text" placeholder="search" value="" class="layui-input">
        </div>
      </div>
    </div>
    <ul class="layui-nav">
      <li class="layui-nav-item" :class="selected=='index'?'layui-this':''">
        <a href="#/">首页</a>
      </li>
      <li class="layui-nav-item" :class="selected=='tools'?'layui-this':''">
        <a href="#/tools">工具</a>
      </li>
      <li class="layui-nav-item" :class="selected=='bill'?'layui-this':''">
        <a href="javascript:void(0);">Bill</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  computed: {
    selected: function () {
      if (this.$route.path.includes('bill')) {
        return 'bill'
      } else if (this.$route.path.includes('tools')) {
        return 'tools'
      } else {
        return 'index'
      }
    }
  }
}
</script>

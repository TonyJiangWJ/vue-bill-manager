<template>
  <li class="layui-timeline-item">
    <i class="layui-icon layui-timeline-axis" @click="toggleShowDetail">&#xe63f;</i>
    <div class="layui-timeline-content layui-text">
        <h3 class="layui-timeline-title">
            <span>{{monthLiabilityModel.month}}</span>&nbsp;
            <span>￥{{monthLiabilityModel.total|longToString}}</span>
            <span :style="{ color: monthLiabilityModel.assetAfterThisMonth>0 ? '#008000' : '#ff0000' }">￥{{monthLiabilityModel.assetAfterThisMonth|longToString}}</span>
        </h3>
        <transition name="fade">
          <div v-if="show" class="layui-collapse">
            <time-line-item-detail @timeLineClick="handleTimeLineClick" v-for="liabilityModel in monthLiabilityModel.liabilityModels" :key="liabilityModel.type+monthLiabilityModel.month" :liability-model="liabilityModel"></time-line-item-detail>
          </div>
        </transition>
    </div>
  </li>
</template>

<script>
import TimeLineItemDetail from '@/components/bills/liability/TimeLineItemDetail'

export default {
  name: 'LiabilityTimeLineItem',
  components: {
    TimeLineItemDetail
  },
  props: {
    monthLiabilityModel: {}
  },
  data () {
    return {
      show: false
    }
  },
  filters: {
    longToString: function (val) {
      return (val / 100).toFixed(2)
    }
  },
  methods: {
    toggleShowDetail: function () {
      this.show = !this.show
    },
    handleTimeLineClick: function (payload) {
      this.$emit('timeLineClick', payload)
    }
  }
}
</script>

<style lang="postcss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

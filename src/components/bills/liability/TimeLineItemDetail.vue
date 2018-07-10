<template>
  <div class="layui-colla-item">
    <h4 class="layui-colla-title" @click="toggleShow">
        <span>{{liabilityModel.name}}</span>&nbsp;
        <span>￥{{liabilityModel.total|longToString}}</span>
    </h4>
    <transition name="fade">
      <div class="layui-colla-content layui-show" v-if="show">
          <ul>
              <li v-for="liability in liabilityModel.liabilityList" :key="liability.name+liability.amount" @click.stop="clickTimeLineItem(liability)">
                  <input type="hidden" name="id" :value="liability.id"/>
                  <span>{{liability.name}}</span>&nbsp;
                  <span>￥{{liability.amount|longToString}}</span>
                  <span :style="liability.paid>0?'display:block;':'display:none;'">
                      (<span style="color: #20f700;">{{liability.paid|longToString}}</span>)
                  </span>
                  &nbsp;
                  <span>{{liability.index}}</span><span>/</span><span>{{liability.installment}}</span>&nbsp;
            <span>还款日：{{liability.repaymentDay}}</span>
              </li>
          </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TimeLineItemDetail',
  props: {
    liabilityModel: {}
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
    clickTimeLineItem: function (liability) {
      this.debug('点击了timeLine中的内容' + JSON.stringify(liability))
      this.$emit('timeLineClick', liability)
    },
    toggleShow: function () {
      this.show = !this.show
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

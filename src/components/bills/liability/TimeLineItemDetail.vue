<template>
  <div class="layui-colla-item" @click="toggleShow">
    <h4 class="layui-colla-title">
        <span>{{name}}</span>&nbsp;
        <span>￥{{total|longToString}}</span>
    </h4>
    <transition>
      <div class="layui-colla-content layui-show" v-if="show">
          <ul>
              <li v-for="liability in liabilityList" :key="liability.name+liability.amount" @click.stop="clickTimeLineItem(liability)">
                  <input type="hidden" name="id" :value="liability.id"/>
                  <span>{{liability.name}}</span>&nbsp;
                  <span>￥{{liability.amount|longToString}}</span>
                  <span :style="liability.paid>0?'display:block;':'display:none;'">
                      (<span style="color: #20f700;">{{liability.paid|longToString}}</span>)
                  </span>
                  &nbsp;
                  <span>{{liability.index}}</span><span>/</span><span>{{liability.installment}}</span>
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
      show: false,
      name: this.liabilityModel.name,
      total: this.liabilityModel.total,
      liabilityList: this.liabilityModel.liabilityList
    }
  },
  filters: {
    longToString: function (val) {
      return (val / 100).toFixed(2)
    }
  },
  methods: {
    clickTimeLineItem: function (liability) {
      console.log('点击了timeLine中的内容' + JSON.stringify(liability))
    },
    toggleShow: function () {
      this.show = !this.show
    }
  }
}
</script>

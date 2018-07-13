<template>
  <div class="layui-colla-item" @click="toggleShow">
    <div class="layui-colla-title">
        <h4>
            <span>{{liabilityModel.type}}</span>&nbsp;
            <span>￥{{liabilityModel.total|longToString}}</span>
        </h4>
    </div>
    <transition name="fade">
      <div class="layui-colla-content layui-show" v-if="show">
          <ul>
              <li v-for="liability in liabilityModel.liabilityList" :key="liability.id" @click.stop="show=show">
                  <span>{{liability.name}}</span>&nbsp;
                  <span>￥{{liability.amount|longToString}}</span>
              </li>
          </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LiabilityItem',
  props: {
    liabilityModel: Object
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
    toggleShow: function () {
      this.show = !this.show
    }
  }
}
</script>

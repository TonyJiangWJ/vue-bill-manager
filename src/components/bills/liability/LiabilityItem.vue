<template>
  <div class="layui-colla-item" @click="toggleShow">
    <div class="layui-colla-title">
        <h4>
            <span>{{liabilityName}}</span>&nbsp;
            <span>￥{{liabilityAmount|longToString}}</span>
        </h4>
    </div>
    <div class="layui-colla-content" :class="show?'layui-show':''">
        <ul>
            <li v-for="liability in liabilityList" :key="liability.id">
                <span>{{liability.name}}</span>&nbsp;
                <span>￥{{liability.amount|longToString}}</span>
            </li>
        </ul>
    </div>
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
      show: false,
      liabilityList: this.liabilityModel.liabilityList,
      liabilityName: this.liabilityModel.name,
      liabilityAmount: this.liabilityModel.total
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

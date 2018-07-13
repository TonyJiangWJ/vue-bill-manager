<template>
  <li>
    <div @click.stop="showLayer">
      <span>{{assetName}}</span>&nbsp;
      <span>￥{{(assetAmount/100).toFixed(2)}}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'AssetItemDetail',
  props: {
    assetId: {
    },
    assetAmount: {
    },
    assetName: {
      type: String
    },
    assetType: {
    }
  },
  data () {
    return {}
  },
  methods: {
    showLayer: function () {
      this.$emit('itemClick', {
        assetId: this.assetId,
        assetAmount: (this.assetAmount / 100).toFixed(2),
        assetName: this.assetName
      })
    }
  }
}
</script>

<template>
  <div class="layui-colla-item">
    <div class="layui-colla-title">
        <h4 @click="toggleShow"><span>{{assetModel.name}}</span> <span>￥{{total}}</span></h4>
    </div>
    <transition name="fade">
      <div class="layui-colla-content layui-show" v-if="show">
          <ul>
              <asset-item-detail v-for='asset in assetModel.assetList' :asset-id="asset.id" :key='asset.id' :asset-name='asset.name' :asset-type='asset.assetType' :asset-amount='asset.amount' @itemClick='handleAssetClick'></asset-item-detail>
          </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import AssetItemDetail from '@/components/bills/asset/AssetItemDetail'

export default {
  name: 'AssetItem',
  props: {
    assetModel: {
      type: Object
    }
  },
  components: {
    AssetItemDetail
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    total: function () {
      return this.assetModel ? (this.assetModel.total / 100).toFixed(2) : ''
    }
  },
  methods: {
    handleAssetClick: function (payload) {
      this.$emit('itemClick', payload)
    },
    toggleShow: function () {
      this.show = !this.show
    }
  }
}
</script>

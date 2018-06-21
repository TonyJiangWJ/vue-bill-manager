<template>
  <div class="layui-colla-item">
    <div class="layui-colla-title">
        <h4 @click="toggleShow"><span>{{name}}</span> <span>￥{{(total/100).toFixed(2)}}</span></h4>
    </div>
    <transition name="fade">
      <div class="layui-colla-content layui-show" v-if="show">
          <ul>
              <asset-item-detail v-for='asset in assetList' :asset-id="asset.id" :key='asset.id' :asset-name='asset.name' :asset-type='asset.assetType' :asset-amount='asset.amount' @itemClick='handleAssetClick'></asset-item-detail>
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
      show: false,
      assetList: this.assetModel.assetList,
      name: this.assetModel.name,
      total: this.assetModel.total
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

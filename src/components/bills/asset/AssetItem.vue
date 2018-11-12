<template>
  <Collapse v-model="collapseAsset">
    <Panel v-for="assetModel in assetModels" :key="assetModel.type" @itemClick="handleAssetClick" :name="assetModel.type">
      <span>{{assetModel.type}}</span> <span>￥{{assetModel ? (assetModel.total / 100).toFixed(2) : ''}}</span>
      <div slot="content" v-for="asset in assetModel.assetList" :key="asset.id">
        <span>{{asset.name}}</span>&nbsp;
        <span>￥{{(asset.amount/100).toFixed(2)}}</span>
      </div>
    </Panel>
  </Collapse>
</template>

<script>
import AssetItemDetail from '@/components/bills/asset/AssetItemDetail'

export default {
  name: 'AssetItem',
  props: {
    assetModels: {
      type: Array
    }
  },
  components: {
    AssetItemDetail
  },
  data () {
    return {
      collapseAsset: '',
      show: false
    }
  },
  computed: {

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

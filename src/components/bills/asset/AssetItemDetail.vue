<template>
  <li>
    <div @click.stop="showLayer">
      <span>{{asset.name}}</span>&nbsp;
      <span>￥{{asset.amount|longToString}}</span>
    </div>
    <Modal v-model="assetModal" title="资产详情" @on-ok="updateAssetInfo" :width="380">
      <Row type="flex" justify="center">
        <Col span="10">名称</Col>
        <Col span="10"><Input type="text" v-model="assetName" :maxlength="20"/></Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span="10">金额</Col>
        <Col span="10"><Input v-model="assetAmount" type="text" @on-blur="checkAmount" placeholder="金额"/></Col>
      </Row>
    </Modal>
  </li>
</template>

<script>
import API from '@/js/api.js'

export default {
  name: 'AssetItemDetail',
  props: {
    asset: {
      type: Object
    }
  },
  data () {
    return {
      assetModal: false,
      assetName: this.asset.name,
      assetAmount: (this.asset.amount / 100).toFixed(2)
    }
  },
  filters: {
    longToString: function (val) {
      return (val / 100).toFixed(2)
    }
  },
  methods: {
    showLayer: function () {
      this.assetModal = true
      this.assetAmount = (this.asset.amount / 100).toFixed(2)
      this.assetName = this.asset.name
    },
    updateAssetInfo: function () {
      let request = {
        id: this.asset.id,
        name: this.assetName,
        amount: (this.assetAmount * 100).toFixed(0)
      }
      API.updateAsset(request).then(resp => {
        if (resp.code === API.CODE_CONST.SUCCESS) {
          this.debug('更新成功')
          this.$emit('reloadAssetInfo')
        }
      })
    },
    checkAmount: function () {
      this.assetAmount = this.checkNumic(this.assetAmount)
    }
  },
  created () {
    this.assetAmountInpt = this.assetAmount
  }
}
</script>

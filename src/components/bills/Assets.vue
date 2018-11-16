<template>
  <div class="asset-container">
    <Modal v-model="addAssetModal" title="添加资产信息" :width="380">
      <Row type="flex" justify="center">
        <Col span="10">父类别</Col>
        <Col span="10">
        <Select v-model="addAssetParentType">
          <Option v-for="parentType in assetParentList" :value="parentType.id" :key="parentType.id">{{ parentType.typeDesc }}</Option>
        </Select>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span="10">子类别</Col>
        <Col span="10">
        <Select v-model="addAssetChildType">
          <Option v-for="childType in assetChildList" :value="childType.id" :key="childType.id">{{ childType.typeDesc }}</Option>
        </Select>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span="10">自定义名称</Col>
        <Col span="10"><Input v-model="addAssetExtName" type="text" placeholder="自定义名称" /></Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span="10">金额</Col>
        <Col span="10"><Input v-model="addAssetAmount" type="text" placeholder="金额" /></Col>
      </Row>
    </Modal>
    <Modal v-model="addLiabilityModal" title="添加分期账单" :width="380">
      <Row type="flex" justify="center">
        <Col span="10">父类别</Col>
        <Col span="10">
          <Select v-model="liabilityParent">
            <Option v-for="parentType in liabilityParentList" :value="parentType.id" :key="parentType.id">{{ parentType.typeDesc }}</Option>
          </Select>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span="10">子类别</Col>
        <Col span="10">
          <Select v-model="liabilityChildType">
            <Option v-for="childType in liabilityChildList" :value="childType.id" :key="childType.id">{{ childType.typeDesc }}</Option>
          </Select>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span="10">分期期数</Col>
        <Col span="10"><InputNumber v-model="installment" placeholder="分期期数" style="width:100%"/></Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span="10">首期还款日</Col>
        <Col span="10"><DatePicker type="date" placeholder="首期还款日" v-model="repaymentDay" style="width:100%"/></Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span="10">总金额</Col>
        <Col span="10"><Input v-model="liabilityAmount" type="text" placeholder="总金额" /></Col>
      </Row>
    </Modal>
    <Divider orientation="left">概览</Divider>
    <Row type="flex" justify="center" align="top" :gutter="5">
      <Col :xs="24" :sm="12">
        <h2>
          <span style="margin-left: 5px;">总资产</span>
          <span style="color: green;">{{totalAsset|longToString}}</span>
          <Button size="small" type="default" @click="addAsset">添加资产</Button>
        </h2>
        <asset-item :assetModels="assetModels" @reloadAssetInfo="loadAssetInfo"/>
      </Col>
      <Col :xs="24" :sm="12">
        <h2>
          <span style="margin-left: 5px;">总负债</span>
          <span style="color: red;">￥{{totalLiability|longToString}}</span>
          <Button size="small" type="default" @click="addLiability">添加分期账单</Button>
        </h2>
        <liability-item :liabilityModels="liabilityModels" />
      </Col>
    </Row>
    <div>
      <div style="margin: 5px;">
        <h2>净资产 <span style="color: #ff0000;" :style="'color: '+(cleanAsset>0 ? '#008000' : '#ff0000')">{{cleanAsset|longToString}}</span></h2>
      </div>
    </div>
    <div class="layui-col-md12 layui-col-xs12">
      <Divider orientation="left">分期还款
      </Divider>
      <Timeline>
        <liability-time-line-item
          @timeLineClick="handleTimeLineClick"
          v-for="monthLiabilityModel in monthLiabilityModels"
          :key="monthLiabilityModel.month"
          :month-liability-model="monthLiabilityModel"
          @reloadAssetInfo="loadAssetInfo">
        </liability-time-line-item>
      </TimeLine>
    </div>
  </div>
</template>

<script>
import AssetItemDetail from '@/components/bills/asset/AssetItemDetail'
import AssetItem from '@/components/bills/asset/AssetItem'
import LiabilityItem from '@/components/bills/liability/LiabilityItem'
import LiabilityTimeLineItem from '@/components/bills/liability/LiabilityTimeLineItem'
import API from '@/js/api.js'
export default {
  name: 'Assets',
  data () {
    return {
      collsapeAsset: false,
      assetId: '',
      assetType: '',
      assetName: '',
      assetAmount: '',
      addAssetParentType: '',
      addAssetChildType: '',
      addAssetAmount: '',
      addAssetExtName: '',
      liabilityType: '',
      liabilityAmount: '',
      liabilityPaid: '',
      liabilityParent: '',
      liabilityChildType: '',
      installment: null,
      repaymentDay: '',
      amount: '',
      totalAsset: '',
      totalLiability: '',
      cleanAsset: '',
      monthLiability: {
        assetAfterThisMonth: ''
      },
      assetModels: [],
      liabilityModels: [],
      monthLiabilityModels: [],
      liabilityParentList: [],
      liabilityChildList: [],
      assetParentList: [],
      assetChildList: [],
      addAssetModal: false,
      addLiabilityModal: false
    }
  },
  filters: {
    longToString: function (val) {
      return (val / 100).toFixed(2)
    }
  },
  components: {
    AssetItem,
    AssetItemDetail,
    LiabilityItem,
    LiabilityTimeLineItem
  },
  methods: {
    handleAssetClick: function (payload) {
      this.assetId = payload.assetId
      this.assetName = payload.assetName
      this.assetAmount = payload.assetAmount
    },
    handleTimeLineClick: function (payload) {
      this.liabilityType = payload.type
      this.liabilityAmount = (payload.amount / 100).toFixed(2)
      this.liabilityPaid = payload.paid
    },
    addAsset: function () {
      this.addAssetModal = true
    },
    addLiability: function () {
      this.addLiabilityModal = true
    },
    loadAssetInfo: function () {
      API.requestAssetManage().then(resp => {
        if (resp && resp.code === API.CODE_CONST.SUCCESS) {
          let assetManageDTO = resp.assetManage
          this.totalAsset = assetManageDTO.totalAsset
          this.cleanAsset = assetManageDTO.cleanAsset
          this.totalLiability = assetManageDTO.totalLiability
          this.assetModels = assetManageDTO.assetModels
          this.liabilityModels = assetManageDTO.liabilityModels
          this.monthLiabilityModels = assetManageDTO.monthLiabilityModels
        }
      })
    }
  },
  watch: {
    liabilityParent: function () {
      this.liabilityChildType = ''
      API.getChildByParent({ id: this.liabilityParent }).then(resp => {
        if (resp.code === API.CODE_CONST.SUCCESS) {
          this.liabilityChildList = resp.assetTypes
        }
      })
    },
    addAssetParentType: function () {
      this.addAssetChildType = ''
      API.getChildByParent({ id: this.addAssetParentType }).then(resp => {
        if (resp.code === API.CODE_CONST.SUCCESS) {
          this.assetChildList = resp.assetTypes
        }
      })
    }
  },
  created () {
    this.loadAssetInfo()
    API.getLiabilityParents()
      .then(resp => {
        if (resp.code === API.CODE_CONST.SUCCESS) {
          this.liabilityParentList = resp.assetTypes
        }
      })
      .then(() => {
        API.getAssetParents().then(resp => {
          if (resp.code === API.CODE_CONST.SUCCESS) {
            this.assetParentList = resp.assetTypes
          }
        })
      })
  }
}
</script>

<style scoped>
.ivu-row-flex {
  margin: 0.15rem 0;
}

@media screen and (min-width: 300px) {
  .asset-container {
    width: 90%;
    margin: 50px auto;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
}

@media screen and (min-width: 600px) {
  .asset-container {
    width: 85%;
    margin: 50px auto;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    padding: 35px;
  }
}

@media screen and (min-width: 900px) {
  .asset-container {
    width: 80%;
    margin: 50px auto;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    padding: 45px;
  }
}

</style>

<template>
  <div>
    <div style="display: none;" id="addAssetLayerContent">
      <div class="layui-form" style="margin: 20px 20px 20px 0;">
        <div class="layui-form-item">
          <label class="layui-form-label">父类别</label>
          <div class="layui-input-inline select-parent">
              <Select v-model="addAssetParentType">
                <Option v-for="parentType in assetParentList" :value="parentType.id" :key="parentType.id">{{ parentType.typeDesc }}</Option>
              </Select>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">子类别</label>
          <div class="layui-input-inline">
              <Select v-model="addAssetChildType">
                <Option v-for="childType in assetChildList" :value="childType.id" :key="childType.id">{{ childType.typeDesc }}</Option>
              </Select>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">自定义名称</label>
          <div class="layui-input-inline">
              <input class="layui-input" v-model="addAssetExtName" type="text" placeholder="自定义名称"/>
          </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">金额</label>
            <div class="layui-input-inline">
                <input class="layui-input" v-model="addAssetAmount" type="text" placeholder="金额"/>
            </div>
        </div>
      </div>
    </div>
    <div style="display: none;" id="assetLayerContent">
        <div class="layui-form" style="margin: 20px 20px 20px 0;">
            <input v-model="assetId" type="hidden"/>
            <div class="layui-form-item">
                <label class="layui-form-label">名称</label>
                <div class="layui-input-inline">
                    <input class="layui-input" v-model="assetName" type="text" readonly="readonly"/>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">金额</label>
                <div class="layui-input-inline">
                    <input class="layui-input" v-model="assetAmount" type="text" placeholder="金额"/>
                </div>
            </div>
        </div>
    </div>
    <div style="display: none;" id="liabilityLayerContent">
        <div class="layui-form" style="margin: 20px 20px 20px 0;">
            <div class="layui-form-item">
                <label class="layui-form-label">类别</label>
                <div class="layui-input-inline">
                    <input class="layui-input" v-model="liabilityType" type="text" readonly="readonly"/>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">金额</label>
                <div class="layui-input-inline">
                    <input class="layui-input" v-model="liabilityAmount" type="text" placeholder="金额"/>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">已还金额</label>
                <div class="layui-input-inline">
                    <input class="layui-input" v-model="liabilityPaid" type="text" placeholder="已还金额"/>
                </div>
            </div>
        </div>
    </div>

    <div style="display: none;" id="addLiabilityLayerContent">
        <div class="layui-form" style="margin: 20px 20px 20px 0;">
            <div class="layui-form-item">
                <label class="layui-form-label">父类别</label>
                <div class="layui-input-inline select-parent">
                    <Select v-model="liabilityParent">
                      <Option v-for="parentType in liabilityParentList" :value="parentType.id" :key="parentType.id">{{ parentType.typeDesc }}</Option>
                    </Select>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">子类别</label>
                <div class="layui-input-inline">
                    <Select v-model="liabilityChildType">
                      <Option v-for="childType in liabilityChildList" :value="childType.id" :key="childType.id">{{ childType.typeDesc }}</Option>
                    </Select>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">分期期数</label>
                <div class="layui-input-inline">
                    <input name="installment" v-model="installment" class="layui-input" placeholder="分期期数" type="number"/>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">首期还款日</label>
                <div class="layui-input-inline">
                    <input id="repaymentDay" v-model="repaymentDay" type="text" class="layui-input" placeholder="首期还款日"/>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">总金额</label>
                <div class="layui-input-inline">
                    <input name="amount" v-model="liabilityAmount" type="number" class="layui-input" placeholder="总金额"/>
                </div>
            </div>
        </div>
    </div>
    <fieldset class="layui-elem-field layui-field-title">
        <legend>概览</legend>
    </fieldset>
    <div class="layui-col-md6 layui-col-xs12">
        <div>
            <h2>
                <span style="margin-left: 5px;">总资产</span>
                <span style="color: green;">{{totalAsset|longToString}}</span>
                <button class="layui-btn layui-btn-xs layui-btn-normal" @click="addAsset">添加资产</button>
            </h2>
        </div>
        <div style="margin: 5px;">
            <div class="layui-collapse layui-text">
              <asset-item v-for="assetModel in assetModels" :key="assetModel.type" @itemClick="handleAssetClick" :asset-model='assetModel'></asset-item>
            </div>
        </div>
    </div>
    <div class="layui-col-md6 layui-col-xs12">
        <div>
            <h2>
                <span style="margin-left: 5px;">总负债</span>
                <span style="color: red;">￥{{totalLiability|longToString}}</span>
            </h2>
        </div>
        <div style="margin: 5px;">
            <div class="layui-collapse layui-text">
              <liability-item v-for="liabilityModel in liabilityModels" :key="liabilityModel.type" :liability-model="liabilityModel"></liability-item>
            </div>
        </div>
    </div>
    <div class="layui-col-md12 layui-col-xs12">
        <div style="margin: 5px;">
            <h2>净资产 <span style="color: #ff0000;" :style="'color: '+(cleanAsset>0 ? '#008000' : '#ff0000')">{{cleanAsset|longToString}}</span></h2>
        </div>
    </div>
    <div class="layui-col-md12 layui-col-xs12">
        <fieldset class="layui-elem-field layui-field-title">
            <legend>分期还款
                <button class="layui-btn layui-btn-xs layui-btn-normal" @click="addLiability">添加分期账单</button>
            </legend>
        </fieldset>

        <div>
            <ul class="layui-timeline">
              <liability-time-line-item @timeLineClick="handleTimeLineClick" v-for="monthLiabilityModel in monthLiabilityModels"
                    :key="monthLiabilityModel.month"
                    :month-liability-model="monthLiabilityModel">
              </liability-time-line-item>
            </ul>
        </div>
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
      installment: '',
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
      assetChildList: []
    }
  },
  filters: {
    longToString: function (val) {
      return (val / 100).toFixed(2)
    }
  },
  components: {
    AssetItem, AssetItemDetail, LiabilityItem, LiabilityTimeLineItem
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
    },
    addLiability: function () {
    },
    loadAssetInfo: function () {
      API.requestAssetManage().then((resp) => {
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
    API.getLiabilityParents().then(resp => {
      if (resp.code === API.CODE_CONST.SUCCESS) {
        this.liabilityParentList = resp.assetTypes
      }
    }).then(() => {
      API.getAssetParents().then(resp => {
        if (resp.code === API.CODE_CONST.SUCCESS) {
          this.assetParentList = resp.assetTypes
        }
      })
    })
  }
}
</script>

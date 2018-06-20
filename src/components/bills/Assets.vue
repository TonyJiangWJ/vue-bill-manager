<template>
  <div>
    <div style="display: none;" id="assetLayerContent">
        <div class="layui-form" style="margin: 20px 20px 20px 0;">
            <input v-model="assetId" type="hidden"/>
            <div class="layui-form-item">
                <label class="layui-form-label">类别</label>
                <div class="layui-input-inline">
                    <input class="layui-input" v-model="assetType" type="text" readonly="readonly"/>
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
                <div class="layui-input-inline">
                    <select v-model="liabilityParent" class="layui-select">
                        <option value="">未选择</option>
                        <option>信用卡</option>
                        <option>京东</option>
                        <option>小米</option>
                    </select>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">子类别</label>
                <div class="layui-input-inline">
                    <select v-model="liabilityChildType" class="layui-select">
                        <option value="">未选择</option>
                    </select>
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
                    <input name="repaymentDay" v-model="repaymentDay" type="text" class="layui-input" placeholder="首期还款日"/>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">总金额</label>
                <div class="layui-input-inline">
                    <input name="amount" v-model="amount" type="number" class="layui-input" placeholder="总金额"/>
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
                <span style="color: green;">{{totalAsset}}</span>
                <button style="margin-left: 5px;" class="layui-btn layui-btn-xs layui-btn-normal"
                        @click="expandAll">展开全部
                </button>
                <button class="layui-btn layui-btn-xs layui-btn-warm" @click="collapseAll">关闭全部</button>
            </h2>
        </div>
        <div style="margin: 5px;">
            <div class="layui-collapse layui-text">
                <div class="layui-colla-item">
                    <div class="layui-colla-title">
                        <h4><span>支付宝</span> <span>￥1000</span></h4>
                    </div>
                    <div class="layui-colla-content">
                        <ul>
                            <li @click="showAssetLayer">
                                <input type="hidden" name="id"/>
                                <span>余额</span>&nbsp;
                                <span>￥0</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="layui-col-md6 layui-col-xs12">
        <div>
            <h2>
                <span style="margin-left: 5px;">总负债</span>
                <span style="color: red;">￥6000</span>
                <button style="margin-left: 5px;" class="layui-btn layui-btn-xs layui-btn-normal"
                        @click="expandAll(this)">展开全部
                </button>
                <button class="layui-btn layui-btn-xs layui-btn-warm" @click="collapseAll(this)">关闭全部</button>
            </h2>
        </div>
        <div style="margin: 5px;">
            <div class="layui-collapse layui-text">
                <div class="layui-colla-item">
                    <div class="layui-colla-title">
                        <h4>
                            <span>支付宝</span>&nbsp;
                            <span>￥2000</span>
                        </h4>
                    </div>
                    <div class="layui-colla-content">
                        <ul>
                            <li>
                                <span>花呗</span>&nbsp;
                                <span>￥2000</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="layui-col-md12 layui-col-xs12">
        <div style="margin: 5px;">
            <h2>净资产<span style="color: #ff0000;" :style="'color: '+(cleanAsset>0 ? '#008000' : '#ff0000')">800</span></h2>
        </div>
    </div>
    <div class="layui-col-md12 layui-col-xs12">
        <fieldset class="layui-elem-field layui-field-title">
            <legend>分期还款
                <button class="layui-btn layui-btn-xs layui-btn-normal" @click="showAddLiability">添加分期账单</button>
            </legend>
        </fieldset>

        <div>
            <ul class="layui-timeline">
                <li class="layui-timeline-item">
                    <i class="layui-icon layui-timeline-axis" @click="toggleHideOrExpand(this)">&#xe63f;</i>
                    <div class="layui-timeline-content layui-text">
                        <h3 class="layui-timeline-title">
                            <span>2018年2月</span>&nbsp;
                            <span>￥6000</span>
                            <span :style="'color: '+monthLiability.assetAfterThisMonth>0 ? '#008000' : '#ff0000'">￥6000</span>
                        </h3>
                        <div style="display: none" class="layui-collapse">
                            <div class="layui-colla-item">
                                <h4 class="layui-colla-title">
                                    <span>支付宝</span>&nbsp;
                                    <span>￥2000</span>
                                </h4>
                                <div class="layui-colla-content">
                                    <ul>
                                        <li @click="showLiabilityLayer(this)">
                                            <input type="hidden" name="id" value="1"/>
                                            <span>花呗</span>&nbsp;
                                            <span>￥2000</span>
                                            <span>
                                                (<span style="color: #20f700;">100</span>)
                                            </span>
                                            &nbsp;
                                            <span>1</span><span>/</span><span>12</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Assets',
  data () {
    return {
      assetId: '',
      assetType: '',
      assetAmount: '',
      liabilityType: '',
      liabilityAmount: '',
      liabilityPaid: '',
      liabilityParent: '',
      liabilityChildType: '',
      installment: '',
      repaymentDay: '',
      amount: '',
      totalAsset: '',
      cleanAsset: '',
      monthLiability: {
        assetAfterThisMonth: ''
      }
    }
  }
}
</script>

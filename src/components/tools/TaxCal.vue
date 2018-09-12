<template>
  <div class="layui-row layui-col-space5">
    <div class="layui-col-md2"></div>
    <div class="layui-col-md8">
      <fieldset>
        <div>
          <label>税前工资</label>
          <input class="layui-input" type="number" v-model="beforeTax" placeholder="税前工资" />
        </div>
        <div>
          <label>税后工资</label>
          <input class="layui-input" type="number" :value="afterTax" readonly="readonly" placeholder="税后" />
        </div>
        <div>
          <button @click="calculate">计算</button>
        </div>
      </fieldset>
      <fieldset>
        <div>
          <label>社保起征点</label>
          <input class="layui-input" placeholder="社保起征" v-model="socialInsurance" type="number" />
        </div>
        <div>
          <label>公积金起征点</label>
          <input class="layui-input" placeholder="公积金起征点" v-model="GPF" type="number" />
        </div>
        <div>
          <label>个税起征点</label>
          <input class="layui-input" placeholder="个税起征点" v-model="tax" type="number" />
        </div>
      </fieldset>
      <fieldset>
        <label>五险一金明细</label>
        <table>
          <thead>
            <tr>
              <th>类别</th>
              <th>金额</th>
              <th>比例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>养老保险
                <span>:</span>
              </td>
              <td>
                <span>{{old}}</span>
              </td>
              <td>
                <span>{{oldPercent}}%</span>
              </td>
            </tr>
            <tr>
              <td>医疗保险
                <span>:</span>
              </td>
              <td>
                <span>{{med}}</span>
              </td>
              <td>
                <span>{{medPercent}}%</span>
              </td>
            </tr>
            <tr>
              <td>失业保险
                <span>:</span>
              </td>
              <td>
                <span>{{job}}</span>
              </td>
              <td>
                <span>{{jobPercent}}%</span>
              </td>
            </tr>
            <tr>
              <td>住房公积金
                <span>:</span>
              </td>
              <td>
                <span>{{gpfFee}}</span>
              </td>
              <td>
                <span>{{gpfFeePercent}}%</span>
              </td>
            </tr>
            <tr>
              <td>扣除五险一金后工资
                <span>:</span>
              </td>
              <td>
                <span>{{afterGPFandSI}}</span>
              </td>
              <td>
                <span>{{afterGPFandSIPercent}}%</span>
              </td>
            </tr>
            <tr>
              <td>个税
                <span>:</span>
              </td>
              <td>
                <span>{{taxFee}}</span>
              </td>
              <td>
                <span>{{taxPercent}}%</span>
              </td>
            </tr>
            <tr>
              <td>应税总额</td>
              <td>
                <span>{{forTax}}</span>
              </td>
              <td>
                <span>{{forTaxPercent}}%</span>
              </td>
            </tr>
            <tr style="background: #a29f8f">
              <td>个税阶梯</td>
              <td colspan="2">
                <span></span>
              </td>
            </tr>
            <tr>
              <td>最终到手
                <span>:</span>
              </td>
              <td>
                <span>{{inHand}}</span>
              </td>
              <td>
                <span>{{inHandPercent}}%</span>
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>
      <div>
        <fieldset>
          <div>
            <label>简易计算器</label>
            <input class="layui-input" type="text" v-model="express" placeholder="算术表达式" />
            <input class="layui-input" type="text" v-model="result" readonly="readonly" placeholder="结果" />
            <button @click="calExpress">计算</button>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="layui-col-md2"></div>
  </div>
</template>

<script>
export default {
  name: 'TaxCal',
  data () {
    return {
      beforeTax: '',
      afterTax: '',
      socialInsurance: '',
      GPF: '',
      tax: '',
      old: '',
      oldPercent: '',
      med: '',
      medPercent: '',
      job: '',
      jobPercent: '',
      gpfFee: '',
      gpfFeePercent: '',
      afterGPFandSI: '',
      afterGPFandSIPercent: '',
      taxFee: '',
      taxPercent: '',
      forTax: '',
      forTaxPercent: '',
      inHand: '',
      inHandPercent: '',
      express: '',
      result: ''
    }
  },
  methods: {
    calculate: function () {},
    calExpress: function () {
      this.result = eval(this.express)
    }
  }
}
</script>

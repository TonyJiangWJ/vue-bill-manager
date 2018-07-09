<template>
  <div>
    <div>
        <fieldset>
            <div>
                <label>税前工资</label>
                <input type="number" id="beforeTax" placeholder="税前工资"/>
            </div>
            <div>
                <label>税后工资</label>
                <input type="number" id="afterTax" readonly="readonly" placeholder="税后"/>
            </div>
            <div>
                <button onclick="calculate()">计算</button>
            </div>
        </fieldset>
        <fieldset>
            <div>
                <label>社保起征点</label>
                <input placeholder="社保起征" id="socialInsurance" type="number" value="2820"/>
            </div>
            <div>
                <label>公积金起征点</label>
                <input placeholder="公积金起征点" id="GPF" type="number" value="1860"/>
            </div>
            <div>
                <label>个税起征点</label>
                <input placeholder="个税起征点" id="tax" type="number" value="3500"/>
            </div>
        </fieldset>
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
                <td>养老保险<span>:</span></td>
                <td><span>{{old}}</span></td>
                <td><span>{{oldPercent}}%</span></td>
            </tr>
            <tr>
                <td>医疗保险<span>:</span></td>
                <td><span>{{med}}</span></td>
                <td><span>{{medPercent}}%</span></td>
            </tr>
            <tr>
                <td>失业保险<span>:</span></td>
                <td><span>{{job}}</span></td>
                <td><span>{{jobPercent}}%</span></td>
            </tr>
            <tr>
                <td>住房公积金<span>:</span></td>
                <td><span>{{gpfFee}}</span></td>
                <td><span>{{gpfFeePercent}}%</span></td>
            </tr>
            <tr>
                <td>扣除五险一金后工资<span>:</span></td>
                <td><span>{{afterGPFandSI}}</span></td>
                <td><span>{{afterGPFandSIPercent}}%</span></td>
            </tr>
            <tr>
                <td>个税<span>:</span></td>
                <td><span>{{taxFee}}</span></td>
                <td><span>{{taxPercent}}%</span></td>
            </tr>
            <tr>
                <td>应税总额</td>
                <td><span>{{forTax}}</span></td>
                <td><span>{{forTaxPercent}}%</span></td>
            </tr>
            <tr style="background: #a29f8f">
                <td>个税阶梯</td>
                <td colspan="2"><span>{{taxStep}}</span></td>
            </tr>
            <tr>
                <td>最终到手<span>:</span></td>
                <td><span>{{inHand}}</span></td>
                <td><span>{{inHandPercent}}%</span></td>
            </tr>
            </tbody>
        </table>
    </div>
    <div>
        <fieldset>
            <div>
                <label>简易计算器</label>
                <input type="text" id="express" placeholder="算术表达式"/>
                <input type="text" id="result" readonly="readonly" placeholder="结果"/>
                <button onclick="calExpress()">计算</button>
            </div>
        </fieldset>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaxCal',
  data () {
    return {}
  }
}
</script>

<template>
  <div>
    <table>
      <tr>
        <th>code</th>
        <th>desc</th>
      </tr>
      <tr v-for="parent in liabilityParentList" :key="parent.id">
        <td>{{parent.typeCode}}</td>
        <td>{{parent.typeDesc}}</td>
      </tr>
      <tr v-for="parent in assetParentList" :key="parent.id">
        <td>{{parent.typeCode}}</td>
        <td>{{parent.typeDesc}}</td>
      </tr>
    </table>
    <div>
      <div>
        <label>类型</label>
        <select v-model="typeIdentify">
          <option value="A">资产</option>
          <option value="L">负债</option>
        </select>
      </div>
      <div>
        <label>父类型</label>
        <select v-model="parentCode">
          <option value=""></option>
          <option v-if="typeIdentify!=='A'" v-for="parent in liabilityParentList" :key="parent.id" value="parent.typeCode">{{parent.typeDesc}}</option>
          <option v-if="typeIdentify==='A'" v-for="parent in assetParentList" :key="parent.id" value="parent.typeCode">{{parent.typeDesc}}</option>
        </select>
      </div>
      <div>
        <label>类型代码</label>
        <input v-model="typeCode" type="text">
      </div>
      <div>
        <label>类型描述</label>
        <input v-model="typeDesc" type="text">
      </div>
      <div><button @click="save">保存</button></div>
    </div>
  </div>
</template>

<script>
import { getLiabilityParents, getAssetParents } from '@/js/api'
export default {
  name: 'AssetTypes',
  data () {
    return {
      liabilityParentList: [],
      assetParentList: [],
      parentCode: '',
      typeCode: '',
      typeDesc: '',
      typeIdentify: 'A'
    }
  },
  methods: {
    save: () => {
      let data = {
        typeCode: this.typeCode,
        typeDesc: this.typeDesc,
        typeIdentify: this.typeIdentify,
        parentCode: this.parentCode
      }
      console.log(JSON.stringify(data))
    }
  },
  mounted () {
    getLiabilityParents().then(resp => {
      if (resp.code === '0001') {
        this.liabilityParentList = resp.assetTypes
      }
    }).then(() => {
      getAssetParents().then(resp => {
        if (resp.code === '0001') {
          this.assetParentList = resp.assetTypes
        }
      })
    })
  }
}
</script>

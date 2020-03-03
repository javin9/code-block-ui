
<template>
  <div class="transfer-form-view-wrapper">
    <h3>基础用法</h3>
    <transfer-form
      v-model="selectedList"
      label="label"
      value="value"
      :data-list="dataList"
    >
    </transfer-form>
    <br>
    <br>
    <h3>Dialog 用法</h3>
    <transfer-form
      show-way="dialog"
      v-model="selectedList1"
      label="label"
      value="value"
      :data-list="dataList"
    >
    </transfer-form>
  </div>
</template>

<script lang="ts">
import TransferForm from '@/blocks/transfer-form/index'
import { Vue, Component, Watch } from 'vue-property-decorator'
@Component({
  components: {
    TransferForm
  }
})
export default class TransferFormView extends Vue {
  selectedList = [
    {
      value: 14,
      label: 'N1_2_2(一课_APP_首页*选课页_年级切换按钮_点击)的pv'
    }
  ]

  selectedList1 = [
    {
      value: 14,
      label: 'N1_2_2(一课_APP_首页*选课页_年级切换按钮_点击)的pv'
    }
  ]

  dataList = [
    {
      value: 1,
      label: 'N1_0_1(一课_APP_首页*选课页_页面_展现)的pv'
    },
    {
      value: 8,
      label: 'N1_1_2(一课_APP_首页*选课页_选课TAB_点击)的pv'
    },
    {
      value: 14,
      label: 'N1_2_2(一课_APP_首页*选课页_年级切换按钮_点击)的pv'
    },
    {
      value: 20,
      label: 'N1_3_2(一课_APP_首页*选课页_搜索入口_点击)的pv'
    },
    {
      value: 26,
      label: 'N1_4_2(一课_APP_首页*选课页_选课单入口_点击)的pv'
    },
    {
      value: 31,
      label: 'N1_5_1(一课_APP_首页*选课页_精选页面_展现)的pv'
    },
    {
      value: 38,
      label: 'N1_6_2(一课_APP_首页*选课页_学科TAB_点击)的pv'
    },
    {
      value: 43,
      label: 'N1_7_1(一课_APP_首页*选课页_banner图_展现)的pv'
    },
    {
      value: 44,
      label: 'N1_7_2(一课_APP_首页*选课页_banner图_点击)的pv'
    },
    {
      value: 45,
      label: 'N1_7_3(一课_APP_首页*选课页_banner图_真实展现)的pv'
    }
  ]

  @Watch('selectedList')
  onSelectedListChanged (val: string) {
    console.log(val)
  }

  created () {
    console.log(' demo index')
  }
}
</script>

<style lang="less" scoped>
.transfer-form-view-wrapper {
  box-sizing: border-box;
  width: 950px;
  margin: 0 auto;
}
</style>

<template>
  <el-scrollbar
    class="transfer-form__all-data"
    :style="scrollbarStyle"
  >
    <el-checkbox-group
      v-model="selectedValue"
      @change="handleChange"
    >
      <div
        class="transfer-form__all-data__item"
        v-for="(item,index) in dataList"
        :key="index"
      >
        <el-checkbox :label="item[value]">
          {{item[label]}}
        </el-checkbox>
      </div>
    </el-checkbox-group>
  </el-scrollbar>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component({})
export default class DataList extends Vue {
  @Prop({ type: Object, required: true }) store!: any
  name = 'DataList'
  scrollbarStyle = {
    maxHeight: '400px'
  }

  selectedValue: any = []

  /** computed */
  get showWay () {
    return this.store.states.showWay
  }

  get dataList () {
    return this.store.states.dataList
  }

  get value () {
    return this.store.states.value
  }

  get label () {
    return this.store.states.label
  }

  @Watch('store.states.selectedValue')
  onChildChanged (val: any) {
    this.selectedValue = [...val]
  }

  created () {
    this.selectedValue = [...this.store.states.selectedValue]
  }

  handleChange () {
    // dialog
    if (this.showWay === 'dialog') {
      const previewList = this.getSelectedList([...this.selectedValue])
      this.store.commit('updatePreviewList', previewList)
    }

    this.store.commit('updateSelected', this.selectedValue)
  }

  // 筛选出已经选中的item
  getSelectedList (selectedValue: any) {
    const result: any = []
    selectedValue.forEach((item: any) => {
      const len = this.dataList.length
      for (let index = 0; index < len; index++) {
        const element = this.dataList[index]
        if (element[this.value] === item) {
          result.push(element)
          break
        }
      }
    })
    return result
  }
}
</script>

<style lang="less" scoped>
//所有数据 all-data
.transfer-form__all-data {
  max-height: 400px;
  box-sizing: border-box;
  border: 1px solid #e1e2e6;
  border-radius: 2px;
  padding: 16px 16px;
  &__item + &__item {
    margin-top: 16px;
  }
}
</style>

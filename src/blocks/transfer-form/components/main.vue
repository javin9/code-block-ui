
<template>
  <div class="transfer-form-wrapper">
    <!-- 左侧label start -->
    <label class="transfer-form__label">关联标签：</label>
    <!-- 左侧label end -->

    <!-- 右侧内容 start -->
    <div class="transfer-form__content">
      <div
        class="transfer-form__plus-button"
        :class="{'is-cursor':!visible}"
        @click="hanldeAddTag"
      >
        <i class="icon-plus iconfont"></i>
        添加标签
      </div>
      <!-- seleted tag start -->
      <selected-show
        :store="store"
        :list="selectedList"
        @remove="removeSelectedTag"
      ></selected-show>
      <!-- seleted tag end -->

      <template v-if="visible&&showWay==='in'">
        <data-list :store="store"></data-list>
        <div class="transfer-form__buttons">
          <el-button
            class="transfer-form__ok"
            type="primary"
            size="medium"
            @click="handlerDataOk"
          >
            确定
          </el-button>
          <el-button
            size="medium"
            @click="handlerDataCancel"
          >
            取消
          </el-button>
        </div>
      </template>
      <template v-else-if="visible&&showWay==='dialog'">
        <el-dialog
          title="选择标签"
          :visible.sync="visible"
          width="680px"
        >
          <!-- <selected-show
            :store="store"
            :list="previewList"
            @remove="removePreviewTag"
          ></selected-show> -->
          <data-list :store="store"></data-list>
          <div slot="footer">
            <el-button
              class="transfer-form__ok"
              type="primary"
              size="medium"
              @click="handlerDataOk"
            >确 定</el-button>
            <el-button
              size="medium"
              @click="handlerDataCancel"
            >取 消</el-button>
          </div>
        </el-dialog>
      </template>
    </div>
    <!-- 右侧内容 end -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Prop } from 'vue-property-decorator'

import DataList from './data-list.vue'
import SelectedShow from './selected-show.vue'
import TransferStore from './transfer-store'
@Component({
  components: {
    DataList,
    SelectedShow
  }
})
export default class TransferForm extends Vue {
  // 展示方式 in:行内展示。dialog：弹窗展示
  @Prop({
    type: String,
    default: 'in',
    validator: value => {
      return ['in', 'dialog'].indexOf(value) !== -1
    }
  })
  showWay!: any

  // checkbox绑定的value属性名称
  @Prop({ type: String, required: true }) value!: any
  // checkbox绑定的label属性名称
  @Prop({ type: String, required: true }) label!: any
  // check数据源
  @Prop({ type: Array, default: () => [] }) dataList!: any

  name = 'TransferForm'
  //  控制显隐
  visible = false
  // 已经选中的value
  selectedValue = []
  scrollbarStyle = { maxHeight: '400px' }
  store!: any

  @Model('change', { type: [Object, Array] }) readonly selectedList!: any

  get previewList () {
    return this.store.states.previewList
  }

  created () {
    const selectedValue = this.initSelected()
    this.store = new TransferStore(this, {
      showWay: this.showWay,
      value: this.value,
      label: this.label,
      dataList: this.dataList,
      previewList: this.selectedList,
      selectedValue
    })
  }

  // 初始化已经选中的checkbox
  initSelected () {
    return this.selectedList.map((item: any) => {
      return item[this.value]
    })
  }

  // 控制选择框的显示和隐藏
  hanldeAddTag () {
    this.visible = true
  }

  handlerDataCancel () {
    this.visible = false
    const selectedValue = this.initSelected()
    this.store.commit('updateSelected', selectedValue)
  }

  handlerDataOk (visible: any = false) {
    const result = this.getSelectedList(this.store.states.selectedValue)
    this.$emit('change', result)
    this.visible = visible
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

  // 删除已经选中的标签
  updateSelected (tag: any) {
    const selectedValue = [...this.store.states.selectedValue].filter(item => {
      return item !== tag[this.value]
    })
    console.log(selectedValue)

    this.store.commit('updateSelected', [...selectedValue])
  }

  // 删除 已经确认的标签
  removeSelectedTag (tag: any) {
    this.updateSelected(tag)
    const result = this.getSelectedList(this.store.states.selectedValue)
    this.$emit('change', result)
  }

  // 删除dialog预览标签
  removePreviewTag (tag: any) {
    const previewList = [...this.store.states.previewList].filter(item => {
      return item[this.value] !== tag[this.value]
    })
    this.store.commit('updatePreviewList', [...previewList])
    this.updateSelected(tag)
  }
}
</script>

<style lang="less" scoped>
.transfer-form-wrapper {
  box-sizing: border-box;
  display: flex;
  @main-color: #42c57a;
  .transfer-form {
    display: flex;
    font-size: 14px;
    //label
    &__label {
      font-size: 14px;
      line-height: 16px;
      flex-shrink: 0;
      color: #777777;
    }
    //content
    &__content {
      flex: 1;
    }
    &__plus-button {
      font-size: 14px;
      line-height: 16px;
      color: @main-color;
      &.is-cursor {
        cursor: pointer;
      }
    }

    &__ok {
      margin-right: 16px;
    }
    &__buttons {
      margin-top: 24px;
    }
  }
}
</style>

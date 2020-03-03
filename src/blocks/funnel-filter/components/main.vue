
<template>
  <div class="funnel-filter">
    <!-- 左侧label start -->
    <label class="funnel-filter__label">{{title}}</label>
    <!-- 左侧label end -->
    <div class="funnel-filter__container">
      <!-- add tag start -->
      <div
        class="funnel-filter__plus-button"
        :class="{'is-cursor':cursor}"
        @click="plusGroup"
      >
        <i class="el-icon el-icon-plus-o"></i>
        添加标签
      </div>
      <!-- add tag end -->
      <!--filter start -->
      <div class="funnel-filter__wrapper">
        <!-- relation start -->
        <div
          class="funnel-filter__relation"
          v-if="multiple"
        >
          <div class="funnel-filter__relation__topline"></div>
          <span
            class="funnel-filter__relation__btn"
            @click.stop="changeMethod"
          >{{releation?'且':'或'}}</span>
          <div class="funnel-filter__relation__bottomline"></div>
        </div>
        <!-- relation end -->
        <!-- contain start -->
        <div
          class="funnel-filter__contain"
          :style="{paddingLeft:containPadding}"
        >
          <div
            class="funnel-filter__contain__item"
            v-for="(model,index) in modelList"
            :key="index"
          >
            <!-- first select start -->
            <el-select
              v-model="model[firstModel]"
              class="multiselect"
              size="medium"
              @change="firstOnChange"
            >
              <el-option
                v-for="item in firstData"
                :key="item.value"
                :value="item.value"
                :label="item.label"
                :disabled="checkIsDiabled(item,model)"
              />
            </el-select>
            <!-- first select end -->

            <!-- second select start -->
            <el-select
              v-model="model[secondModel]"
              class="functional"
              size="medium"
              @change="secondChange"
            >
              <el-option
                v-for="(item) in secondData"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
            <!-- second select end -->

            <!-- last select start -->
            <el-select
              multiple
              filterable
              allow-create
              class="select-value"
              v-model="model[thirdModel]"
              @change="thirdChange"
              size="medium"
            >
              <template v-if="model[firstModel]">
                <el-option
                  v-for="(item) in childrenMap[model[firstModel]]"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </template>
            </el-select>
            <!-- last select end -->
            <i
              class="el-icon el-icon-delete-o dusbin"
              @click="removeItem(model,index)"
            ></i>
          </div>
        </div>
        <!-- contain end -->
      </div>
      <!-- filter end -->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator'
@Component({})
export default class FunnelFilter extends Vue {
  @Model('change', { type: Array, default: () => [] }) readonly selectedList!: any
  @Prop({ type: String, default: '关联标签：' }) title!: string
  // 第一个select Data
  @Prop({ type: Array, default: () => [] }) firstData!: []
  // 第二个 select data
  @Prop({ type: Array, default: () => [] }) secondData!: []
  // v-model绑定的值
  // @Prop({ type: Array, default: () => [] }) selectedList!: []
  // 自定义第一个 model名称 默认firstModel
  @Prop({ type: String, default: 'firstModel' }) firstModel!: string
  // 自定义第二个 model名称 默认secondModel
  @Prop({ type: String, default: 'secondModel' }) secondModel!: string
  // 自定义第三个 model名称 默认thirdModel
  @Prop({ type: String, default: 'thirdModel' }) thirdModel!: string
  // 指定子树为节点对象的某个属性值
  @Prop({ type: String, default: 'children' }) children!: string

  /** data */
  name = 'FunnelFilter'
  releation = false
  options3 = [
    {
      value: 1,
      label: '专题课'
    },
    {
      value: 2,
      label: '班课'
    },
    {
      value: 3,
      label: '试听课'
    },
    {
      value: 4,
      label: '一课'
    }
  ]

  modelList: any = []

  // 第三个 select 数据映射 key 是value
  get childrenMap () {
    const result: any = {}
    this.firstData.forEach((item: any) => {
      result[`${item.value}`] = item[this.children] || []
    })
    return result
  }

  // 判断是否是多个
  get multiple () {
    return Array.isArray(this.modelList) && this.modelList.length > 1
  }

  // 一条数据靠左 多条数据靠右
  get containPadding () {
    return this.multiple ? '46px' : '0px'
  }

  // model 数据模型
  get dataModel () {
    return {
      [this.firstModel]: '',
      [this.secondModel]: '',
      [this.thirdModel]: ''
    }
  }

  get selectedValue () {
    return this.modelList.map((item: any) => {
      return item[this.firstModel]
    })
  }

  get cursor () {
    return !(this.modelList.length >= this.firstData.length)
  }

  /** created */
  created () {
    this.modelList = [...this.selectedList]
  }

  /** methods  */
  // 改变方式
  changeMethod () {
    this.releation = !this.releation
    this.$emit('relation', this.releation)
  }

  // 添加一项 id：的作用是删除的时候唯一标志
  plusGroup () {
    if (this.modelList.length > 0 && this.modelList.length >= this.firstData.length) {
      this.$message({
        showClose: true,
        message: '警告：已经达到上限',
        type: 'warning'
      })
      return
    }
    const item = Object.assign({}, this.dataModel, { [this.firstModel]: +new Date() })
    this.modelList.push(item)
  }

  // 移除一项
  removeItem (model: any) {
    const result = this.modelList.filter((item: any) => {
      return item[this.firstModel] !== model[this.firstModel]
    })
    this.modelList = [...result]
  }

  checkIsDiabled (item: any) {
    return this.selectedValue.indexOf(item.value) > -1
  }

  // 第一个select 触发change
  firstOnChange (value: any) {
    this.onChange('first-change', value)
  }

  // 第一个select 触发change
  secondChange (value: any) {
    this.onChange('second-change', value)
  }

  // 第一个select 触发change
  thirdChange (value: any) {
    this.onChange('third-change', value)
  }

  onChange (key: any, value: any) {
    this.$nextTick(() => {
      this.$emit(key, value)
      this.$emit('change', [...this.modelList])
    })
  }
}
</script>

<style lang="less" scoped>
@main-color: #42c57a;

.funnel-filter {
  box-sizing: border-box;
  display: flex;
  font-size: 14px;
  &__label {
    line-height: 24px;
    height: 24px;
    flex-shrink: 0;
    color: #777777;
  }

  &__plus-button {
    display: inline-block;
    line-height: 24px;
    height: 24px;
    &.is-cursor {
      cursor: pointer;
    }
    color: @main-color;
  }
  &__container {
    flex: 1;
  }
  // relation start
  &__wrapper {
    margin-top: 24px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  &__relation {
    box-sizing: border-box;
    position: absolute;
    width: 30px;
    height: 100%;
    // height: calc(100% - 10px);
    &__topline {
      margin: 16px 0 0 16px;
      border-left: 1px solid #ccc;
      border-top: 1px solid #ccc;
      width: 100%;
      height: calc(50% - 32px);
    }
    &__btn {
      display: inline-block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 2px;
      background-color: @main-color;
      color: #fff;
      cursor: pointer;
      &:active {
        background-color: #38bc6d;
      }
    }
    &__bottomline {
      margin: 0 0 16px 16px;
      border-left: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      width: 100%;
      height: calc(50% - 32px);
    }
  }
  // relation end

  // contain start
  &__contain {
    box-sizing: border-box;
    padding-left: 46px;
    flex: 1;
    &__item {
      .add-group {
        display: inline-block;
        width: 32px;
        height: 32px;
        line-height: 32px;
        .inner {
          box-sizing: border-box;
          display: inline-block;
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          font-size: 14px;
          border: 1px solid @main-color;
          border-radius: 2px;
          vertical-align: middle;
          color: @main-color;
          cursor: pointer;
        }
      }
      .select-value {
        width: 320px;
      }
      .el-icon-delete-o {
        padding-left: 8px;
        color: #83868f;
        cursor: pointer;
        font-size: 14px;
        &:hover {
          color: #42c57a;
        }
      }
    }

    &__item + &__item {
      margin-top: 16px;
    }
    .functional {
      margin: 0 8px;
    }
  }
  // contain end
}
</style>

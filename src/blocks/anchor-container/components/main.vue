
<template>
  <div class="anchor-container-wrapper">
    <!-- 左侧 start -->
    <div
      class="anchor-container__content"
      ref="scrollContainer"
    >
      <slot></slot>
    </div>
    <!-- 左侧 end -->
    <!-- 右侧 start -->
    <div>
      <div class="anchor-container__menu">
        <ul class="anchor-container__menu__item-container">
          <li
            class="active-bar"
            :style="translate"
          >
            <span></span>
          </li>
          <li
            v-for="(item,index) in panels"
            :key="index"
            :class="{'is-active':index===currentTab}"
            :style=itemStyle
            @click="scrollTo(item.refName,index)"
            class="anchor-container__menu__item"
          >
            {{item.label}}
          </li>
        </ul>
      </div>
    </div>
    <!-- 右侧 end -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class AnchorContainer extends Vue {
  name = 'AnchorContainer'
  componentName = 'AnchorContainer'
  @Prop({ type: Number, default: 32 }) menuItemHeight!: any
  // 当前tab
  currentTab = 0
  // 领域
  fields: any = []

  // 右侧选中的位置
  get translate () {
    const translateY = this.currentTab * this.menuItemHeight // currentTab
    return {
      transform: `translateY(${translateY}px)`
    }
  }

  // 面板数量信息
  get panels () {
    return this.fields.map((item: any) => {
      const { refName, label } = item
      return {
        refName,
        label
      }
    })
  }

  // menu-item 的style
  get itemStyle () {
    return {
      lineHeight: `${this.menuItemHeight}px`
    }
  }

  created () {
    // ssr 兼容
    if (this.$isServer) {
      return
    }
    // 监听 组的数量
    this.$on('anchor.addField', (field: any) => {
      if (field) {
        this.$nextTick(() => {
          this.fields.push(field)
        })
      }
    })
  }

  // 滚动到指定 ref名称处
  scrollTo (refName: any, index: number) {
    if (!this.$children && !this.$children[index]) {
      return
    }
    const element: any = this.$children[index].$refs[refName]
    if (!element) {
      return
    }
    const top = Array.isArray(element) ? element[0].offsetTop : element.offsetTop
    this.currentTab = index
    this.$nextTick(() => {
      ;(this.$refs.scrollContainer as any).scrollTo(0, top)
    })
  }
}
</script>

<style lang="less" scoped>
.anchor-container-wrapper {
  box-sizing: border-box;
  position: relative;
  display: flex;
  height: 100%;
  * {
    margin: 0;
    padding: 0;
  }
  li,
  ul {
    list-style: none;
  }
  .anchor-container {
    position: relative;
    display: flex;
    height: 100%;
    &__content {
      height: 100%;
      overflow: auto;
      flex: 1;
      .content-item {
        margin-bottom: 100px;
      }
    }
    &__menu {
      flex-shrink: 0;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        height: 100%;
        width: 2px;
        background-color: #e4e7ed;
        border-radius: 2px;
        z-index: 1;
      }

      &__item-container {
        position: relative;
        box-sizing: border-box;
      }
      &__item {
        padding-left: 16px;
        line-height: 32px;
        cursor: pointer;
        &.is-active {
          color: #42c57a;
        }
        font-size: 12px;
      }
      .active-bar {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 2px;
        height: 32px;
        background-color: #42c57a;
        z-index: 3;
        transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }
    //滚动条
    ::-webkit-scrollbar {
      width: 0px;
      height: 0px;
      background-color: #ffffff;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #cccccc;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
    }
  }
}
</style>

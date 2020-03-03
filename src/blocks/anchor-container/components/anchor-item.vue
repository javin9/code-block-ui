<template>
  <div class="anchor-item">
    <h3
      class="anchor-item__title"
      :ref="refName"
    >{{label}}</h3>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class AnchorItem extends Vue {
  // 标题
  @Prop({ type: String, required: true }) label!: string
  @Prop({ type: String, required: true }) refName!: string

  name = 'AnchorItem'

  mounted () {
    // 触发父级
    this.dispatch('AnchorContainer', 'anchor.addField', [this])
  }

  dispatch (componentName: any, eventName: any, params: any) {
    let parent = this.$parent || this.$root
    // let name = (parent.$options as any).componentName
    let name = (parent as any).name

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent

      if (parent) {
        name = (parent.$options as any).componentName
      }
    }
    if (parent) {
      ;(parent as any).$emit.apply(parent, [eventName].concat(params))
    }
  }
}
</script>
<style lang="less" scoped>
.anchor-item {
  // 标题
  &__title {
    margin-bottom: 24px;
    box-sizing: border-box;
    font-size: 16px;
    color: #323233;
    font-weight: 500;
    &:before {
      content: '';
      display: inline-block;
      margin-right: 12px;
      width: 4px;
      height: 14px;
      vertical-align: -2px;
      background: #42c57a;
    }
  }
}
</style>

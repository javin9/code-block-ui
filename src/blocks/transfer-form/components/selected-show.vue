<template>
  <ul class="transfer-form__selected">
    <li
      class="transfer-form__selected__tag"
      v-for="(item,index) in list"
      :key="index"
    >{{item[label]}} <i
        @click="remove(item)"
        class="iconfont icon-pupupClose"
      ></i></li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class DataList extends Vue {
  @Prop({ type: Array, default: () => [] }) list!: any
  @Prop({ type: Object, required: true }) store!: any
  get value () {
    return this.store.states.value
  }

  get label () {
    return this.store.states.label
  }

  // 移除
  remove (item: any) {
    this.$emit('remove', item)
  }
}
</script>

<style lang="less" scoped>
//已选择的tag
.transfer-form__selected {
  padding: 0;
  margin-top: 16px;
  &__tag {
    display: inline-block;
    border-radius: 2px;
    margin: 0 8px 8px 0;
    padding: 0 12px;
    line-height: 28px;
    background: #f0f1f5;
    font-size: 12px;
    color: #333;
    .icon-pupupClose {
      display: inline-block;
      padding-left: 3px;
      font-size: 12px;
      color: #83868f;
      transform: scale(0.6);
      cursor: pointer;
      &:hover {
        color: #42c57a;
      }
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

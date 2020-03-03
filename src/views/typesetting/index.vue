
<template>
  <div class="typesetting-view-wrapper">
    <h3>单列</h3>
    <typesetting :columns="1"></typesetting>
    <br>
    <h3>双列</h3>
    <typesetting :columns="2"></typesetting>
    <h3>多列</h3>
    <typesetting :columns="3"></typesetting>
  </div>
</template>

<script lang="ts">
import Typesetting from '@/blocks/typesetting/index'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    Typesetting
  }
})
export default class TypesettingView extends Vue {
  created () {
    console.log(' demo index')
  }
}
</script>

<style lang="less" scoped>
.typesetting-view-wrapper {
  box-sizing: border-box;
  width: 950px;
  margin: 0 auto;
}
</style>

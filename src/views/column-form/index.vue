<template>
  <div class="column-form-wrapper">
    <column-form></column-form>
  </div>
</template>

<script lang="ts">
import ColumnForm from '@/blocks/column-form/index'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    ColumnForm
  }
})
export default class Index extends Vue {
  created () {
    console.log(' demo index')
  }
}
</script>

<style lang="less" scoped>
.column-form-wrapper {
  width: 950px;
  margin: 0 auto;
}
</style>

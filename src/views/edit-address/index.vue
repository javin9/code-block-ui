
<template>
  <div class="edit-address-view-wrapper">
    <edit-address></edit-address>
  </div>
</template>

<script lang="ts">
import EditAddress from '@/blocks/edit-address/index'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    EditAddress
  }
})
export default class EditAddressView extends Vue {
  created () {
    console.log(' demo index')
  }
}
</script>

<style lang="less" scoped>
.edit-address-view-wrapper {
  width: 950px;
  margin: 0 auto;
}
</style>

<template>
  <div>
    <basic-form></basic-form>
  </div>
</template>

<script lang="ts">
import BasicForm from '@/blocks/basic-form/index'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    BasicForm
  }
})
export default class Index extends Vue {
  // name = 'BasicForm'
  created () {
    console.log('BasicForm demo index')
  }
}
</script>

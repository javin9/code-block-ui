
<template>
  <div class="edit-address-wrapper">
    <div v-if="!isEditor">
      <div class="board">
        <span class="board__name">{{userInfo.name}}</span>
        <span class="board__split">|</span>
        <span class="board__phone">{{userInfo.phone}}</span>
      </div>
      <div class="address">
        <span v-if="address.province">{{address.province}}</span>
        <span v-if="address.city">{{address.city}}</span>
        <span v-if="address.prefecture">{{address.prefecture}}</span>
        <span v-if="address.town">{{address.town}}</span>
        <span v-if="userInfo.address">{{userInfo.address}}</span>
        <span
          class="address__editor"
          @click="editor"
        ><i class="icon-edit iconfont"></i>编辑</span>
      </div>
    </div>
    <editor-form
      v-else
      :address="address"
      @save="save"
      @cancel="cancel"
    ></editor-form>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import EditorForm from './editor-form.vue'
@Component({
  components: {
    EditorForm
  }
})
export default class EditAddress extends Vue {
  isEditor = false
  name = 'EditAddress'
  userInfo = {
    name: '李小鹏',
    phone: '18600000000',
    address: '世纪佳缘小区'
  }

  // 地址
  address = {
    province: '北京',
    city: '朝阳',
    prefecture: '朝阳',
    town: '三环内'
  }

  /** method  */

  editor () {
    this.isEditor = !this.isEditor
  }

  save (data: any) {
    this.userInfo = Object.assign({}, data)
    this.isEditor = !this.isEditor
  }

  cancel () {
    this.isEditor = !this.isEditor
  }
}
</script>

<style lang="less" scoped>
.edit-address-wrapper {
  padding: 32px;
  color: #525354;
  font-size: 14px;
  line-height: 32px;
  .board {
    display: flex;
    align-items: center;
    &__name {
      font-size: 18px;
    }
    &__split {
      padding: 0 10px;
    }
  }
  .address {
    font-size: 0;
    span {
      font-size: 14px;
      padding-right: 8px;
    }
    // address__editor
    .address__editor {
      align-items: center;
      color: #42c57a;
      font-size: 12px;
      line-height: 12px;
      i {
        vertical-align: baseline;
      }
    }
  }
}
</style>

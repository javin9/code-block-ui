
<template>
  <div class="anchor-container-view-wrapper">
    <anchor-container>
      <!-- 基本信息 start -->
      <anchor-item
        label="基本信息"
        ref-name="first"
      >
        <div>
          <el-form
            class='demo-step'
            label-width="78px"
            size="medium"
          >
            <el-form-item label="章节名称：">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="课程类别：">
              <el-radio label="0">
                核心课
              </el-radio>
              <el-radio label="1">
                测试课
              </el-radio>
            </el-form-item>
          </el-form>
        </div>
      </anchor-item>
      <!-- 上架信息 start -->
      <anchor-item
        label="上架信息"
        ref-name="second"
      >
        <el-form
          class='demo-step'
          label-width="78px"
          size="medium"
        >
          <el-form-item label="章节名称：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="课程名称：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="课程类别：">
            <el-radio label="0">
              核心课
            </el-radio>
            <el-radio label="1">
              测试课
            </el-radio>
          </el-form-item>
        </el-form>
      </anchor-item>
      <!-- 下架信息 start -->
      <anchor-item
        label="下架信息"
        ref-name="third"
      >
        <el-form
          class='demo-step'
          label-width="78px"
          size="medium"
        >
          <el-form-item label="章节名称：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="课程类别：">
            <el-radio label="0">
              核心课
            </el-radio>
            <el-radio label="1">
              测试课
            </el-radio>
          </el-form-item>
        </el-form>
      </anchor-item>
    </anchor-container>
  </div>
</template>

<script lang="ts">
import Anchor from '@/blocks/anchor-container/index'
import { Vue, Component } from 'vue-property-decorator'

const { AnchorContainer, AnchorItem } = Anchor
@Component({
  components: {
    AnchorContainer,
    AnchorItem
  }
})
export default class AnchorContainerView extends Vue {
  created () {
    console.log(' demo index')
  }
}
</script>

<style lang="less" scoped>
.anchor-container-view-wrapper {
  border: 1px solid #ccc;
  padding: 16px;
  box-sizing: border-box;
  width: 600px;
  margin: 0 auto;
  overflow: hidden;
  height: 300px;
  /deep/ .el-input {
    width: 200px;
  }
  //滚动条
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background-color: #ffffff;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
  }
}
</style>


<template>
  <div class="typesetting-wrapper">
    <h3 class="typesetting__title">筛选输入类表单
    </h3>
    <div class="typesetting__container">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-col :span="colspan">
            <div class="typesetting-item">
              <label class="typesetting-item__label">关键字类型：</label>
              <div class="typesetting-item__content">图文回复</div>
            </div>
          </el-col>
          <el-col :span="colspan">
            <div class="typesetting-item">
              <label class="typesetting-item__label">手机号：</label>
              <div class="typesetting-item__content">186000000000</div>
            </div>
          </el-col>
          <el-col :span="colspan">
            <div class="typesetting-item">
              <label class="typesetting-item__label">预约金额：</label>
              <div class="typesetting-item__content"><span>23 </span>元</div>
            </div>
          </el-col>
          <el-col :span="colspan">
            <div class="typesetting-item">
              <label class="typesetting-item__label">预计交付题量：</label>
              <div class="typesetting-item__content"><span>1</span> - <span>5.00</span></div>
            </div>
          </el-col>
          <el-col :span="colspan">
            <div class="typesetting-item">
              <label class="typesetting-item__label">创建时间：</label>
              <div class="typesetting-item__content">2019年6月11日 13:57:44</div>
            </div>
          </el-col>
          <el-col :span="colspan">
            <div class="typesetting-item">
              <label class="typesetting-item__label">试验类型：</label>
              <div class="typesetting-item__content">
                试验组名称
              </div>
            </div>
          </el-col>
          <el-col :span="colspan">
            <div class="typesetting-item">
              <label class="typesetting-item__label">备注：</label>
              <div class="typesetting-item__content">
                1.备注说明备注说明备注
              </div>
            </div>
          </el-col>
          <el-col :span="colspan">
            <div class="typesetting-item">
              <label class="typesetting-item__label">当前实验流量：</label>
              <div class="typesetting-item__content">
                <div>参与本次实验的例</div>
              </div>
            </div>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
const NUMBER_24 = 24
@Component({})
export default class Typesetting extends Vue {
  name = 'Typesetting'
  // 列的数量。占多少栅格 一列展示
  @Prop({
    type: Number,
    default: 1
    // validator: (value: number) => {
    //   // return value <= 24 && value > 0
    // }
  })
  columns!: number

  /** data */
  span = NUMBER_24
  value = ''
  options = [
    {
      value: '选项1',
      label: '黄金糕'
    },
    {
      value: '选项2',
      label: '双皮奶'
    },
    {
      value: '选项3',
      label: '蚵仔煎'
    },
    {
      value: '选项4',
      label: '龙须面'
    },
    {
      value: '选项5',
      label: '北京烤鸭'
    }
  ]

  tableData = [
    {
      id: '001',
      name: '红色淘宝风格红色淘宝风格',
      fid: 393,
      percent: '50%',
      roll: '--'
    },
    {
      id: '003',
      name: '绿色简约风格绿色简约风格',
      fid: 393,
      percent: '70%',
      roll: '--'
    },
    {
      id: '004',
      name: '红色淘宝风格红色淘宝风格',
      fid: 393,
      percent: '50%',
      roll: '--'
    }
  ]

  /** computed */
  get colspan () {
    return NUMBER_24 / this.columns
  }
}
</script>

<style lang="less" scoped>
.typesetting-wrapper {
  box-sizing: border-box;
  .typesetting {
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
    &__container {
      box-sizing: border-box;
      padding: 0 24px;
      .typesetting-item {
        display: flex;
        font-size: 14px;
        line-height: 32px;
        &__label {
          flex-shrink: 0;
          width: 110px;
          color: #777777;
        }
        &__content {
          flex: 1;
          color: x#333333;
        }
        //
        img {
          width: 120px;
          height: 120px;
        }
      }

      //card
      .card {
        box-sizing: border-box;
        border: 1px solid #f0f1f5;
        border-radius: 2px;
        &__header {
          box-sizing: border-box;
          line-height: 40px;
          padding: 0 16px;
          background-color: #f0f1f5;
          border-bottom: 1px solid #f0f1f5;
        }
        &__content {
          padding: 16px;
        }
      }
    }
  }
  /deep/ .el-select {
    margin-right: 24px;
  }
}
</style>

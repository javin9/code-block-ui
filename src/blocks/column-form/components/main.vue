<template>
  <div class="column-form">
    <!-- title  start-->
    <h3 class="form__title">筛选输入类表单</h3>
    <!-- title end -->
    <!-- form start -->
    <el-form
      ref="ColumnForm"
      size="medium"
      label-width="120px"
      label-position="right"
      :model="form"
    >
      <el-row>

        <!-- 人员类型： -->
        <el-col :span="colspan">
          <el-form-item
            label="人员类型："
            prop="memberType"
          >
            <el-select
              v-model="form.memberType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 入职时间： -->
        <el-col :span="colspan">
          <el-form-item label="入职时间：">
            <el-date-picker
              v-model="form.entryTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <!-- 姓名： -->
        <el-col :span="colspan">
          <el-form-item
            label="姓名："
            prop="name"
          >
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>

        <!-- 状态： -->
        <el-col :span="colspan">
          <el-form-item label="状态">
            <el-select
              v-model="form.status"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 联系方式 -->
        <el-col :span="colspan">
          <el-form-item label="联系方式：">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
        </el-col>

        <!-- 离职时间： -->
        <el-col :span="colspan">
          <el-form-item label="离职时间：">
            <el-date-picker
              v-model="form.leaveTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <!-- 邮箱 -->
        <el-col :span="colspan">
          <el-form-item label="邮箱：">
            <el-input
              v-model="form.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
        </el-col>

        <!-- 谈话人 -->
        <el-col :span="colspan">
          <el-form-item label="谈话人：">
            <el-input
              v-model="form.talker"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
        </el-col>

        <!-- 看板名称 -->
        <el-col :span="colspan">
          <el-form-item label="看板名称：">
            <el-input
              v-model="form.boardName"
              maxlength="10"
            ></el-input>
          </el-form-item>
        </el-col>

        <!-- 分流方式 -->
        <el-col :span="colspan">
          <el-form-item label="分流方：">
            <el-select
              v-model="form.shuntType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-form-item>
          <el-button
            type="primary"
            @click="hanleSubmit"
            size="medium"
          >保存</el-button>
          <el-button
            @click="hanleReset"
            size="medium"
          >取消</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- form end -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class ColumnForm extends Vue {
  name = 'ColumnForm'

  // 列数
  columns = 2
  // form data
  form: any = {
    memberType: '', // 关键字类型：
    entryTime: '', // 入职时间
    leaveTime: '', // 离职时间
    status: '', // 状态
    mobile: '', // 联系方式
    email: '', // 邮箱
    talker: '', // 谈话人
    name: '' // 名称
  }

  //
  business: any = [
    {
      value: 'yike',
      text: '一课'
    },
    {
      value: 'yiduiyi',
      text: '一对一'
    },
    {
      value: 'huanxiong',
      text: '浣熊'
    },
    {
      value: 'zuoyebang',
      text: '作业帮'
    }
  ]

  //
  options: any = [
    {
      value: '选项1',
      label: '黄金糕'
    },
    {
      value: '选项2',
      label: '双皮奶',
      disabled: true
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

  // computed
  get colspan () {
    if (this.columns > 24 && this.columns <= 0) {
      this.columns = 1
    }
    return 24 / this.columns
  }

  /** methods **/
  onSelectChange (...args: any) {
    console.log(args)
  }

  /**
   * 保存
   */
  hanleSubmit () {
    ;(this.$refs.ColumnForm as any).validate((valid: any) => {
      if (valid) {
        console.log('on submit')
        console.log(this.form)
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  /**
   * 取消
   */
  hanleReset () {
    ;(this.$refs.ColumnForm as any).resetFields()
  }
}
</script>

<style lang="less" scoped>
@main-color: #42c57a;
@color-999: #999;
@width-small: 148px;
//复写zyb-pc-ui样式
/deep/ .el-checkbox {
  line-height: 32px;
}

/deep/ .el-input,
.el-date-editor--datetimerange.el-input__inner {
  width: 200px;
}

/deep/ .el-slider__input .el-input {
  width: 100%;
}

/deep/ .el__input__short .el-input,
.el-input-number--medium {
  width: 136px;
}

/deep/ .el-slider {
  width: 496px;
}

.column-form {
  //标题
  .form__title {
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
      background: @main-color;
    }
  }
  //common
  .form__tooltips {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    width: 16px;
    height: 16px;
    color: #83868f;
  }
  .form__note {
    line-height: 17px;
    font-size: 14px;
    color: #999999;
  }
  .form__unit {
    font-size: 14px;
    padding-left: 8px;
    color: #323233;
  }
  .margin__bottom__20 {
    margin-bottom: 16px;
  }
}
</style>

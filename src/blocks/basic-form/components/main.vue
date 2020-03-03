<template>
  <div class="basic-form">
    <!-- title  start-->
    <h3 class="form__title">筛选输入类表单</h3>
    <!-- title end -->
    <!-- form start -->
    <el-form
      ref="basicForm"
      size="medium"
      label-width="120px"
      label-position="right"
      :rules="rules"
      :model="form"
    >
      <el-form-item
        label="关键字类型："
        prop="keyWordType"
      >
        <el-select
          v-model="form.keyWordType"
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
      <!-- 名称： -->
      <el-form-item
        label="名称："
        prop="name"
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="手机号：">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <!-- 等价关键字 -->
      <el-form-item label="等价关键字：">
        <el-input v-model="form.equalKeyWord"></el-input>
        <el-tooltip
          placement="top"
          effect="light"
          popper-class="base-tooltip-white"
          content="窗口说明,可以自定义内容和样式"
        >
          <span class="form__tooltips">
            <i class="icon-hint-o iconfont"></i>
          </span>
        </el-tooltip>
      </el-form-item>
      <!-- 看板名称 -->
      <el-form-item label="看板名称：">
        <el-input
          v-model="form.boardName"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <!-- 分流方式 -->
      <el-form-item label="分流方：">
        <el-select
          class="el__input__short"
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
        <span
          class="form__note"
          style="padding-left: 8px;"
        >UV：同一个用户仅被一个试验组命中</span>
      </el-form-item>
      <!-- 预约金额 -->
      <el-form-item label="预约金额：">
        <el-input-number
          placeholder="精确到角和分"
          class="el__input__short"
          v-model="form.orderMoney"
          :controls="false"
          :precision="2"
        ></el-input-number><span class="form__unit">元</span>
      </el-form-item>
      <!-- 预计交互题量 -->
      <el-form-item label="预计交互题量：">
        <el-input-number
          class="el__input__short"
          v-model="form.minAmount"
          :controls="false"
          :min="0"
        ></el-input-number>
        <span class="form__tooltips">-</span>
        <el-input-number
          class="el__input__short"
          v-model="form.minAmount"
          :controls="false"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <!-- 补寄原因1 -->
      <el-form-item label="补寄原因：">
        <el-select
          class="el__input__short"
          v-model="form.keyWordType"
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
        <span class="form__tooltips">&nbsp;</span>
        <el-select
          class="el__input__short"
          v-model="form.keyWordType"
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
      <!-- 查询时间 -->
      <el-form-item label="查询时间：">
        <el-date-picker
          v-model="form.serchDate"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <!-- 状态 -->
      <el-form-item label="状态：">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">启用</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--  通知 -->
      <el-form-item label="通知：">
        <el-switch v-model="form.notice">
        </el-switch>
      </el-form-item>
      <!-- 业务方向 -->
      <el-form-item label="业务方向：">
        <el-checkbox-group
          v-model="form.business"
          @change="onSelectChange($event)"
        >
          <el-checkbox
            v-for="item in business"
            :label="item.value"
            :key="item.value"
          >{{item.text}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 跳转 -->
      <el-form-item label="跳转：">
        <div class="margin__bottom__20">
          <el-radio-group v-model="form.redirect">
            <el-radio :label="0">跳转</el-radio>
            <el-radio :label="1">小程序</el-radio>
          </el-radio-group>
        </div>

        <div v-if="form.redirect===0">
          <el-input
            placeholder="请输入内容"
            v-model="form.url"
          >
            <template slot="prepend">http://</template>
          </el-input>
        </div>
        <div v-if="form.redirect===1">
          <el-input
            class="margin__bottom__20"
            placeholder="请输入APPID,需与公众号绑定关联关系"
            v-model="form.appid"
          ></el-input>
          <br />
          <el-input
            class="margin__bottom__20"
            placeholder="请输入页面路径"
            v-model="form.path"
          ></el-input>
        </div>
      </el-form-item>
      <!-- remark -->
      <el-form-item label="备注：">
        <el-input
          type="textarea"
          :maxlength="20"
          placeholder="请输入内容..."
          v-model="form.remark"
        >
        </el-input>
      </el-form-item>
      <!-- 滑动输入条 -->
      <el-form-item label="滑动输入条：">
        <el-slider
          show-input
          input-size="medium"
          :show-input-controls="false"
          v-model="form.slider"
        >
        </el-slider>
      </el-form-item>
      <!-- 填写时间 -->
      <el-form-item label="填写邮箱：">
        <el-time-select
          class="el_input_136"
          placeholder="起始时间"
          v-model="form.startTime"
        >
        </el-time-select>
        <span class="form__tooltips">-</span>
        <el-time-select
          class="el_input_136"
          placeholder="结束时间"
          v-model="form.endTime"
        >
        </el-time-select>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱：">
        <el-input
          placeholder="请输入内容"
          v-model="form.email"
        >
          <template slot="append">@zuoyebang.com</template>
        </el-input>
      </el-form-item>
      <!-- 上传Logo -->
      <el-form-item label="上传：">
        <div
          class="form__note"
          style="line-height:32px;"
        >尺寸720*405，仅限png格式，最多可上传三张</div>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.imageUrl"
            :src="form.imageUrl"
            class="avatar"
          />
          <i
            v-else
            class="zyb-icon-common-upload-3 el-upload__avatar"
          ></i>
        </el-upload>
      </el-form-item>
      <!-- 操作 -->
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
    </el-form>

    <!-- form end -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class BasicForm extends Vue {
  name = 'BasicForm'
  // form data
  form: any = {
    keyWordType: '', // 关键字类型：
    name: '', // 名称
    mobile: '', // 手机号
    equalKeyWord: '', // 等价关键字
    boardName: '', // 看板名称
    shuntType: '', // 分流方式
    orderMoney: '', // 预约金额
    minAmount: 0, // 最低预计交互题量
    maxAmount: 5000, // 最高预计交互题量
    reasonPre: '', // 补寄原因1
    resonNext: '', // 补寄原因2
    status: 0, // 状态
    notice: true, // 通知
    business: ['huanxiong'], // 业务方向
    redirect: 0, // 跳转
    appid: '', // appid
    path: '', // 路径
    url: '', // 网址
    remark: '', // 备注
    slider: 40, // 滑动输入条
    startTime: '',
    endTime: '',
    serchDate: new Date(), // 查询日期
    email: '', // 邮箱
    imageUrl: '' // 头像
  }

  rules: any = {
    keyWordType: [{ required: true, message: '请选择关键字类型' }],
    name: [{ required: true, message: '请输入名称' }]
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

  /** methods **/
  onSelectChange (...args: any) {
    console.log(args)
  }

  handleAvatarSuccess (res: any, file: any) {
    this.form.imageUrl = URL.createObjectURL(file.raw)
  }

  beforeAvatarUpload (file: any) {
    const isJPG = file.type === 'image/jpeg'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return isJPG && isLt2M
  }

  /**
   * 保存
   */
  hanleSubmit () {
    ;(this.$refs.basicForm as any).validate((valid: any) => {
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
    ;(this.$refs.basicForm as any).resetFields()
  }
}
</script>

<style lang="less" scoped>
@main-color: #42c57a;
@color-999: #999;
@width-default: 320px;
@width-small: 148px;
//复写zyb-pc-ui样式
/deep/ .el-checkbox {
  line-height: 32px;
}

/deep/ .el-textarea {
  width: 496px;
}

/deep/ .el-input,
.el-date-editor--datetimerange.el-input__inner {
  width: 320px;
}

/deep/ .el-slider__input .el-input {
  width: 100%;
}

/deep/ .el__input__short .el-input,
.el-input-number--medium {
  width: 136px;
}

/deep/ .el_input_136 {
  width: 136px;
}

/deep/ .el-slider {
  width: 496px;
}

.basic-form {
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

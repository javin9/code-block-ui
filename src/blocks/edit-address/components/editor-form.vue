<template>
  <el-form
    ref="ruleForm"
    class="address-form"
    size="medium"
    :model="form"
    :rules="rules"
    label-width="100px"
  >
    <!-- 所有地区 -->
    <div>
      <label class="el-form-item__label el-form-item__custom">所在地区：</label>
      <el-form-item
        class="inline-item"
        prop="provinceCode"
        label-width="0"
      >
        <el-select
          @change="addressInfoChange(arguments, 1)"
          class="address"
          v-model="form.provinceCode"
          ref="province"
          placeholder="省"
        >
          <el-option
            v-for="value in orderAddress.provinceMap"
            :key="value.areaId"
            :label="value.areaName"
            :value="value.areaId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="inline-item"
        prop="cityCode"
        label-width="0"
        v-if="orderAddress.cityMap && orderAddress.cityMap.length"
      >
        <el-select
          @change="addressInfoChange(arguments, 2)"
          class="address"
          v-model="form.cityCode"
          placeholder="市"
        >
          <el-option
            v-for="value in orderAddress.cityMap"
            :key="value.areaId"
            :label="value.areaName"
            :value="value.areaId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label-width="0"
        class="inline-item"
        prop="prefectureCode"
        v-if="orderAddress.prefectureMap && orderAddress.prefectureMap.length"
      >
        <el-select
          @change="addressInfoChange(arguments, 3)"
          class="address"
          v-model="form.prefectureCode"
          placeholder="县/区"
        >
          <el-option
            v-for="value in orderAddress.prefectureMap"
            :key="value.areaId"
            :label="value.areaName"
            :value="value.areaId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label-width="0"
        class="inline-item"
        prop="townCode"
        v-if="orderAddress.townMap && orderAddress.townMap.length"
      >
        <el-select
          size="medium"
          class="address"
          v-model="form.townCode"
          placeholder="乡镇"
        >
          <el-option
            v-for="value in orderAddress.townMap"
            :key="value.areaId"
            :label="value.areaName"
            :value="value.areaId"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </div>

    <!--详细地址  -->
    <el-form-item
      label="详细地址："
      prop="detail"
      class="long-text"
    >
      <el-input
        class="detail-address"
        v-model="form.detail"
        placeholder="请与用户确认后填写详细地址"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="收货人名："
      prop="name"
      class="long-text"
    >
      <el-input
        class="detail-address"
        v-model="form.name"
        placeholder="请与用户确认后填写收货人姓名"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="收货电话："
      prop="phoneNumber"
      class="long-text"
    >
      <el-input
        class="detail-address"
        v-model="form.phoneNumber"
        placeholder="请与用户确认后填写收货电话"
      >
      </el-input>
    </el-form-item>
    <!-- 保存和取消 -->
    <el-form-item>
      <el-button
        type="primary"
        class="save-btn"
        @click="onSubmit"
      >确 定</el-button>
      <el-button @click="hide">取 消</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

// API：goods/na/address/getaddress 任何域名下都可以访问 参数
// 根据areaId这个参数获取下一级的地址列表
import axios from 'axios'
const getData = (params = { areaId: 0 }) => {
  return new Promise((resolve, reject) => {
    resolve()
    axios({
      method: 'get',
      url: 'http://zuoyebang.cc/goods/na/address/getaddress',
      params
    })
      .then((res: any) => {
        resolve(res.data.data)
      })
      .catch(() => {
        reject(new Error(''))
      })
  })
}

const checkAddress = (rule: any, value: any, callback: any) => {
  if ((value + '').trim().length < 5 || (value + '').trim().length > 60) {
    callback(new Error('详细地址长度在5到60个汉字'))
  } else {
    callback()
  }
}
const checkName = (rule: any, value: any, callback: any) => {
  if ((value + '').trim().length < 1 || (value + '').trim().length > 20) {
    callback(new Error('姓名长度在1到20个汉字'))
  } else {
    callback()
  }
}
const checkPhone = (rule: any, value: any, callback: any) => {
  if ((value + '').trim().length !== 11) {
    callback(new Error('请输入11位手机号码'))
  } else {
    callback()
  }
}

@Component({})
export default class EiditForm extends Vue {
  @Prop({ type: Object, default: {} }) address!: any
  name = 'EiditForm'
  orderAddress: any = {
    provinceMap: [],
    cityMap: [],
    prefectureMap: [],
    townMap: []
  }

  form: any = {
    detail: '',
    name: '',
    phoneNumber: '',
    provinceCode: '',
    cityCode: '',
    prefectureCode: '',
    townCode: ''
  }

  areaTypeMap: any = {
    1: 'provinceMap',
    2: 'cityMap',
    3: 'prefectureMap',
    4: 'townMap'
  }

  addressTitle = '编辑地址'
  province = ''
  city = ''
  district = ''

  // 表单验证规则
  rules = {
    provinceCode: [{ required: true, message: '请选择省', trigger: 'change' }],
    cityCode: [{ required: true, message: '请选择市', trigger: 'change' }],
    prefectureCode: [{ required: true, message: '请选择区/县', trigger: 'change' }],
    townCode: [{ required: true, message: '请选择乡镇', trigger: 'change' }],
    detail: [
      { required: true, message: '请输入详细地址', trigger: 'blur' },
      { validator: checkAddress, trigger: 'blur' }
    ],
    name: [
      { required: true, message: '请输入收货人', trigger: 'blur' },
      { validator: checkName, trigger: 'blur' }
    ],
    phoneNumber: [
      { required: true, message: '请输入收货电话', trigger: 'blur' },
      { validator: checkPhone, trigger: 'blur' }
    ]
  }

  /** method */
  show () {
    const address = this.address
    // 获取级联地址信息
    if (!(address && address.province)) {
      getData({
        areaId: 0
      })
        .then((data: any) => {
          if (data) {
            this.orderAddress.provinceMap = data.areaList
            // this.dialogFormVisible = true
          }
        })
        .catch(reject => {
          this.$message.error(reject.errStr)
        })
      return
    }
    getData({
      areaId: 0
    })
      .then((data: any) => {
        if (data && address.province) {
          console.log(data)

          this.orderAddress.provinceMap = data.areaList
          const obj = this.orderAddress.provinceMap.find((item: any) => {
            return item.areaName === address.province
          })
          console.log(obj)

          if (obj && obj.areaId) {
            this.form.provinceCode = obj.areaId
            return getData({ areaId: this.form.provinceCode })
          }
        } else if (data) {
          this.orderAddress.provinceMap = data.areaList
        } else {
          this.$message.warning('获取地址库信息失败，请联系研发人员')
        }
      })
      .then((data: any) => {
        if (data && address.city) {
          this.orderAddress.cityMap = data.areaList
          const obj = this.orderAddress.cityMap.find((item: any) => {
            return item.areaName === address.city
          })
          if (obj && obj.areaId) {
            this.form.cityCode = obj.areaId
            return getData({ areaId: this.form.cityCode })
          }
        }
      })
      .then((data: any) => {
        if (data && address.prefecture) {
          this.orderAddress.prefectureMap = data.areaList
          const obj = this.orderAddress.prefectureMap.find((item: any) => {
            return item.areaName === address.prefecture
          })
          if (obj && obj.areaId) {
            this.form.prefectureCode = obj.areaId
            return getData({ areaId: this.form.prefectureCode })
          }
        }
      })
      .then((data: any) => {
        if (data && address.town) {
          this.orderAddress.townMap = data.areaList
          const obj = this.orderAddress.townMap.find((item: any) => {
            return item.areaName === address.town
          })
          if (obj && obj.areaId) {
            this.form.townCode = obj.areaId
          }
        }
        this.form.detail = address.address
        this.form.name = address.name
        this.form.phoneNumber = address.phone
        // this.dialogFormVisible = true
      })
      .catch(reject => {
        this.$message.error(reject.errStr)
      })
  }

  hide () {
    this._resetForm()
    this.$emit('cancel')
  }

  // 获取地区名，list：字典数据，code：地区编号
  getAreaName (list: any, code: any) {
    if (!(list && code)) {
      return ''
    }
    return list.find((item: any) => {
      return item.areaId === code
    }).areaName
  }

  onSubmit () {
    ;(this.$refs.ruleForm as any).validate((valid: any) => {
      if (valid) {
        const submitData = {
          phone: this.form.phoneNumber,
          name: this.form.name,
          province: this.getAreaName(this.orderAddress.provinceMap, this.form.provinceCode),
          city: this.getAreaName(this.orderAddress.cityMap, this.form.cityCode),
          prefecture: this.getAreaName(this.orderAddress.prefectureMap, this.form.prefectureCode),
          town: this.getAreaName(this.orderAddress.townMap, this.form.townCode),
          address: this.form.detail
        }
        this.$emit('save', submitData)
        this.hide()
      } else {
        console.log('no valid')
      }
    })
  }

  // 获取各级地址：args - 当前选取地区编号，type - 地区级别
  addressInfoChange (args: any, type = 1) {
    const code = args[0]
    this.orderAddress &&
      getData({
        areaId: code
      })
        .then((data: any) => {
          switch (type) {
            case 1:
              this.orderAddress.prefectureMap = []
              this.orderAddress.townMap = []
              this.orderAddress.cityMap = data.areaList
              this.form.cityCode = ''
              this.form.prefectureCode = ''
              this.form.townCode = ''
              break
            case 2:
              this.orderAddress.townMap = []
              this.orderAddress.prefectureMap = data.areaList
              this.form.prefectureCode = ''
              this.form.townCode = ''
              break
            case 3:
              this.orderAddress.townMap = data.areaList
              this.form.townCode = ''
              break
          }
        })
        .catch(reject => {
          this.$message.error(reject.errStr)
        })
  }

  _resetForm () {
    ;(this.$refs.ruleForm as any).resetFields()
    this.form = {
      detail: '',
      name: '',
      phoneNumber: '',
      provinceCode: '',
      cityCode: '',
      prefectureCode: '',
      townCode: ''
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-input {
  width: 320px;
}

/deep/ .el-select .el-input {
  width: 150px;
}
.inline-item {
  display: inline-block;
}
.el-form-item__custom {
  width: 100px;
  &:before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
}
.save-btn {
  margin-right: 16px;
}
.footer-editor-address {
  padding-left: 78px;
}
</style>

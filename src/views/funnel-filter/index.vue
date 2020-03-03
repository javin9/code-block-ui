
<template>
  <div class="funnel-filter-view-wrapper">
    <funnel-filter
      v-model="modelList"
      :first-data="option1"
      :second-data="options2"
      @first-change="firstChange"
      @second-change="secondChange"
      @third-change="thirdChange"
      @relation="onRelation"
    >
    </funnel-filter>
  </div>
</template>

<script lang="ts">
import FunnelFilter from '@/blocks/funnel-filter/index'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    FunnelFilter
  }
})
export default class FunnelFilterView extends Vue {
  modelList = [
    {
      firstModel: 8,
      secondModel: 'equal',
      thirdModel: [1]
    },
    {
      firstModel: 10,
      secondModel: 'greater',
      thirdModel: [2]
    }
  ]

  option1 = [
    {
      value: 8,
      label: 'av(应用版本号)',
      children: [
        {
          value: 1,
          label: '1.1.2'
        },
        {
          value: 2,
          label: '2.3.4'
        },
        {
          value: 3,
          label: '3.4.5'
        }
      ]
    },
    {
      value: 10,
      label: 'graID(业务年级ID)',
      children: [
        {
          value: 1,
          label: '大神班'
        },
        {
          value: 2,
          label: '菜苗班'
        }
      ]
    },
    {
      value: 19,
      label: 'plat(事件发生所处平台)',
      children: [
        {
          value: 1,
          label: '作业帮'
        },
        {
          value: 2,
          label: '一课'
        },
        {
          value: 3,
          label: '浣熊'
        }
      ]
    },
    {
      value: 21,
      label: 'lastfrom(流量入口标签。透传直至订单，遇到新的参数值替换新值)',
      children: [
        {
          value: 1,
          label: 'Yes'
        },
        {
          value: 2,
          label: 'No'
        },
        {
          value: 3,
          label: 'Or'
        }
      ]
    },
    {
      value: 29,
      label: 'SKUID(课程商品ID)',
      children: [
        {
          value: 'ID123',
          label: 'ID123'
        },
        {
          value: 'ID2345',
          label: 'ID2345'
        },
        {
          value: 'ID4567',
          label: 'ID4567'
        }
      ]
    },
    {
      value: 32,
      label: 'banID(一课首页banner资源位ID)',
      children: [
        {
          value: 1,
          label: '作业帮'
        },
        {
          value: 2,
          label: '一课'
        },
        {
          value: 3,
          label: '浣熊'
        }
      ]
    },
    {
      value: 67,
      label: 'SPUID(课程商品聚合包ID)',
      children: [
        {
          value: 1,
          label: '作业帮'
        },
        {
          value: 2,
          label: '一课'
        },
        {
          value: 3,
          label: '浣熊'
        }
      ]
    }
  ]

  options2 = [
    {
      value: 'equal',
      label: '等于'
    },
    {
      value: 'noequal',
      label: '不等于'
    },
    {
      value: 'greater',
      label: '包含'
    },
    {
      value: 'less',
      label: '不包含'
    }
  ]

  firstChange () {
    console.log(this.modelList)
  }

  secondChange () {
    console.log(this.modelList)
  }

  thirdChange () {
    console.log(this.modelList)
  }

  onRelation (name: any) {
    console.log(name)
  }

  created () {
    console.log(' demo index')
  }
}
</script>

<style lang="less" scoped>
.funnel-filter-view-wrapper {
  box-sizing: border-box;
  width: 950px;
  margin: 0 auto;
}
</style>

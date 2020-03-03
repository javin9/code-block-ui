
/**
 * 代码库预览文件内容
 * blockName:代码块名称
 * chName：中文名
 * description：介绍
 * upperName：大小写转换后 block-name ==> BlockName
 * libName：发包后的名称  block-name  ==> blockname
 * category:类别
 */
const render = require('json-templater/string')
const path = require('path')
const cwd = process.cwd()
const { saveFile } = require('../util/index')
// const fileSave = require('file-save')

const { VIEW_PATH } = require('../util/const')

// index.ts
const indexTsTpl = `
export default {
  path: '/{{blockName}}',
  name: '{{blockName}}',
  component: () => import('./index.vue')
}`

// index.vue
const indexVueTpl = `
<template>
  <div class="{{blockName}}-view-wrapper">
    <{{blockName}}></{{blockName}}>
  </div>
</template>

<script lang="ts">
import {{upperName}} from '@/blocks/{{blockName}}/index'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    {{upperName}}
  }
})
export default class {{upperName}}View extends Vue {
  created () {
    console.log(' demo index')
  }
}
</script>

<style lang="less" scoped>
.{{blockName}}-view-wrapper {
  box-sizing: border-box;
  width: 950px;
  margin: 0 auto;
}
</style>`

const createFilePath = (blockName) => {
  return (section) => {
    return path.resolve(cwd, VIEW_PATH, blockName, section)
  }
}

function createViewFiles (options) {
  return new Promise((resolve, reject) => {
    try {
      // index.ts
      const indexTsContent = render(indexTsTpl, options)

      // index.vue
      const indexVueContent = render(indexVueTpl, options)

      // index.ts filename
      const createViewFilePathName = createFilePath(options.blockName)
      const indexTsFilename = createViewFilePathName('index.ts')
      const indexVueFilename = createViewFilePathName('index.vue')

      // 写文件
      const Files = [
        {
          filename: indexTsFilename,
          content: indexTsContent
        },
        {
          filename: indexVueFilename,
          content: indexVueContent
        }
      ]
      // 生成promise
      const saveFileList = Files.map((file) => {
        return saveFile(file)
      })
      // 批量处理
      Promise.all(saveFileList)
        .then(() => {
          resolve()
        }).catch(() => {
          reject()
        })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = createViewFiles

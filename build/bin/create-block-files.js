/**
 * 代码库核心文件内容
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
// const fileSave = require('file-save')
// const chalk = require('chalk')
const { BLOCK_PATH } = require('../util/const')
const { saveFile } = require('../util/index')

// README.md

const readmeTpl = `
### {{blockName}}
{{chName}}  
{{description}}`

// index.js
const indexTpl = `
import {{upperName}} from './components/main.vue'

({{upperName}} as any).install = (Vue: any) => {
  Vue.component({{upperName}}.name, {{upperName}})
}

export default {{upperName}}`
// package.json
const packageJsonTpl = `
{
  "name": "@axe/{{blockName}}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "../../../node_modules/.bin/cross-env VUE_CLI_SERVICE_CONFIG_PATH=$PWD/../../../vue.config.js VUE_CLI_CONTEXT=$PWD/../../../  ../../../node_modules/.bin/vue-cli-service build --target lib  --name {{libName}}  --dest lib ./src/blocks/{{blockName}}/index.ts",
    "screenshot": "../../node_modules/.bin/screenshot -l -s '#mountNode'",
    "prepublishOnly": "npm run build && npm run screenshot"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "repository": {
    "type": "git",
    "url": "https://git.zuoyebang.cc/ued/code-block-ui/blob/dev/src/blocks/{{blockName}}/components/main.vue"
  },
  "homepage": "https://ued.suanshuabang.com/block#{{blockName}}",
  "axeConfig": {
    "name": "{{blockName}}",
    "category": "{{category}}",
    "displayName": "{{chName}}"
  }
}`

// component/main.vue

const vueTpl = `
<template>
  <div class="{{blockName}}-wrapper">
     {{chName}}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class {{upperName}} extends Vue {
  name = '{{upperName}}'
}
</script>

<style lang="less" scoped>
  .{{blockName}}-wrapper{
    box-sizing: border-box;
    margin:0;
    padding:0;
  }
</style>`

const createFilePath = (blockName) => {
  return (section) => {
    return path.resolve(cwd, BLOCK_PATH, blockName, section)
  }
}

/**
 * blockName:代码块名称
 * chName：中文名
 * description：介绍
 * upperName：大小写转换后 block-name ==> BlockName
 * libName：发包后的名称  block-name  ==> blockname
 * category:类别
 */
const createBlockFiles = (options) => {
  // const { blockName, chName, description, upperName, libName, category } = options
  const { blockName } = options
  return new Promise((resolve, reject) => {
    try {
      // README
      const readmeContent = render(readmeTpl, options)
      // index.js
      const indexContent = render(indexTpl, options)
      // package.json
      const packageJsonContent = render(packageJsonTpl, options)
      // vue 
      const vueContent = render(vueTpl, options)

      // 文件目录
      const createBlockFileName = createFilePath(blockName)
      const readmeFileName = createBlockFileName('./README.md')
      const indexFileName = createBlockFileName('./index.ts')
      const packageJsonFileName = createBlockFileName('./package.json')
      const vueFileName = createBlockFileName('./components/main.vue')

      // 写文件
      const Files = [
        {
          filename: readmeFileName,
          content: readmeContent
        },
        {
          filename: indexFileName,
          content: indexContent
        },
        {
          filename: packageJsonFileName,
          content: packageJsonContent
        },
        {
          filename: vueFileName,
          content: vueContent
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
      reject()
    }
  })
}

module.exports = createBlockFiles


/**
 * 快速创建代码块相关文件
 */

const validateNpmPackageName = require('validate-npm-package-name')
const chalk = require('chalk')
const ora = require('ora')
const inquirer = require('inquirer')
const fs = require('fs-extra')
const path = require('path')
const cwd = process.cwd()

const uppercamelcase = require('uppercamelcase')

const questions = require('../util/question.js')
const createBlockFiles = require('./create-block-files')
const createBlockViewFiles = require('./create-block-view-files')
const { BLOCK_PATH } = require('../util/const')

process.on('exit', () => {
  console.log()
})

// 判断参数是否正确
if (!process.argv[2]) {
  console.log(chalk.red('Error:block-name is required'))
  console.log(chalk.green('格式：yarn create <block-name> [中文名]'))
  process.exit(1)
}

const spinner = ora('开始创建...')
/**
 * 开始创建
 */
async function run () {
  try {
    // 获取名称
    const blockName = process.argv[2]
    const chName = process.argv[3] || blockName

    // 验证名称合法性
    const { validForNewPackages, validForOldPackages } = validateNpmPackageName(blockName)
    if (!validForNewPackages || !validForOldPackages) {
      console.log(chalk.red('Error:Invalid block name'))
      process.exit(1)
    }

    // 判断代码块是否已存在
    const blockPath = path.resolve(cwd, BLOCK_PATH, blockName)
    if (fs.existsSync(blockPath)) {
      console.log(chalk.red(`Error:${blockName} 已经存在`))
      process.exit(1)
    }

    // 询问分类和描述
    const answers = await inquirer.prompt(questions)
    const upperName = uppercamelcase(blockName)
    const libName = blockName.replace(/-/ig, '')
    const params = { ...answers, blockName, chName, upperName, libName }
    // 开始
    console.log('')
    spinner.start()
    console.log('')

    await createBlockFiles(params)
    await createBlockViewFiles(params)

    setTimeout(() => {
      console.log('')
      spinner.succeed('Success')
      console.log('')
    }, 800)
  } catch (error) {
    spinner.fail()
    process.exit(1)
  }
  // 创建src/blocks下面的文件
}

// 执行
run()

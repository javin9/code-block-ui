
const category = ['Other', 'Form', 'Table', 'Dialog', 'Information', 'List']

module.exports = [
  {
    type: 'input',
    name: 'description',
    message: '请选择添加描述?',
    default: ''
  },
  {
    type: 'list',
    name: 'category',
    message: '请选择分类?',
    choices: category,
    default: category[0]
  }
]

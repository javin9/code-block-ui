const fileSave = require('file-save')
const chalk = require('chalk')

const saveFile = (file) => {
  return new Promise((resolve, reject) => {
    try {
      fileSave(file.filename)
        .write(file.content, 'utf8')
        .end('\n')
        .finish(() => {
          resolve()
        })
    } catch (error) {
      console.log(chalk.red(`${file.filename} is failed`))
      reject()
    }
  })
}

module.exports = {
  saveFile
}

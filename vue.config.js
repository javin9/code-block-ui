const path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

console.log('start build')
console.log(__dirname)

module.exports = {
  chainWebpack: (config) => {
    config.resolve
      .alias.set('blocks', resolve('./src/blocks')).end()
  }
}

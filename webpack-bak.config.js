const path = require('path');

module.exports = {
  // JavaScript 执行入口文件
  entry: {
    index : './src/index.js',
    core : './src/core.js'
  },
  mode: 'development',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: '[name].js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  }
};
/**
 * @Desc: main
 * @Author: wu xingtao
 * @Date: 2021/3/11
 */
const path = require('path')
module.exports = {
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, '../../src')
    }
    return config
  }
}

/**
 * @Desc: babel.config.js
 * @Author: wu xingtao
 * @Date: 2021/5/13
 */
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'x-ui',
        customStyleName: name => {
          name = name.slice(3)
          return `../src/packages/theme-chalk/src/${name}.scss`
        },
        styleLibraryName: 'theme-chalk'
      }
    ],
    [
      'babel-plugin-module-resolver',
      {
        root: ['../src'],
        alias: {
          '@x-ui': './src/packages'
        }
      }
    ]
  ]
}

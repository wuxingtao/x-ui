module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: false
      }
    ]
  ],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        root: ['x-ui'],
        alias: {
          '@x-ui': 'x-ui/src/packages'
        }
      }
    ]
  ]
}

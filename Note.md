## 技术栈

Vue3+TS+rollup

* rollUp 用于UI组件打包为整体 `npm run build:esm-bundle`


## 组件按需加载

1. 使用babel-plugin-import 按需引入
样式文件按需从指定组件如：button/index.sccss
2. 参考element-plus(theme-chalk) 按需引入 theme-default 组件样式

## 样式
样式参考element-plus

## 组件开发模式
> BEM命名参考vant

> 1. vant setup(()=>{return ()=>{}}) 直接jsx渲染
> 2. element-plus 使用template渲染
> 3. setup(){ return () => h('div', [count.value, object.foo]) } 返回一个render函数

> 组件结构参考element-plus + vant

## storybook

>使用v6版本 支持vue3

全局加载样式
```js
// .storybook/preview.js
import '../src/packages/theme-default/index.scss'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}
```

配置alias > .storybook,root 都需要配置babel
// .storybook/babel.config.js
```js
    plugins:[
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
```

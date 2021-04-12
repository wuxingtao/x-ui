## 技术栈

Vue3+TS+rollup

* rollUp 用于UI组件打包为整体 `npm run build:esm-bundle`


## 组件按需加载

使用babel-plugin-import 按需引入

## 样式
样式参考element-plus

## 组件开发模式
> BEM命名参考vant

> 1. vant setup(()=>{return ()=>{}}) 直接jsx渲染
> 2. element-plus 使用template渲染
> 3. setup(){ return () => h('div', [count.value, object.foo]) } 返回一个render函数

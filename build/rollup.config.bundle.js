/**
 * @Desc: rollup.config.bundle
 * @Author: wu xingtao
 * @Date: 2021/2/8
 */
import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
// import babel from 'rollup-plugin-babel'
import { babel } from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'

export default {
  input: path.resolve(__dirname, '../src/packages/index.ts'),
  output: {
    format: 'es',
    // name: 'xUi',
    // format: 'umd',
    file: 'lib/index.esm.js'
  },
  plugins: [
    nodeResolve(),
    vue({
      target: 'browser',
      css: false,
      exposeFilename: false
    }),
    typescript({
      tsconfigOverride: {
        // include: ['packages/**/*', 'typings/vue-shim.d.ts'],
        // exclude: ['node_modules', 'packages/**/__tests__/*']
      },
      abortOnError: false
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['vue', '.js', '.jsx', '.ts', '.tsx']
    })
  ]
}

/**
 * @Desc: index
 * @Author: wu xingtgao
 * @Date: 2021/1/25
 */
import Button from './button'
import Input from './input'

function install(app) {
  const components = [Button, Input]
  components.forEach(item => {
    if (item.install) {
      app.use(item)
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}

export default {
  install: install,
  version: '0.0.1'
}

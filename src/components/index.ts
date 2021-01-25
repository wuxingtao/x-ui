/**
 * @Desc: index
 * @Author: wu xingtgao
 * @Date: 2021/1/25
 */
import Button from "./button";

function install(app) {
  const components = [Button];
  components.forEach(item => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}

export default {
  install: install,
  version: "0.0.1"
};

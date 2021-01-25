/**
 * @Desc: component
 * @Author: wu xingtgao
 * @Date: 2021/1/25
 */
import { defineComponent } from "vue";
import { camelize } from "@/utils/format/string";

// 定义组件
export function createComponent(name: string) {
  return function(sfc: any) {
    sfc.name = name;
    sfc.install = function(app: {
      component: (arg0: string, arg1: any) => void;
    }) {
      app.component(name, sfc);
      app.component(camelize("-" + name), sfc);
    };
    return defineComponent(sfc);
  };
}

/**
 * @Desc: string
 * @Author: wu xingtgao
 * @Date: 2021/1/25
 */
const camelizeRe = /-(\w)/g;

// -转驼峰
export function camelize(str: string) {
  return str.replace(camelizeRe, function(_, c) {
    return c.toUpperCase();
  });
}

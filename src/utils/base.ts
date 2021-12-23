/**
 * @Desc: base
 * @Author: wu xingtao
 * @Date: 2021/5/15
 */
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function get(object: any, path: string): any {
  const keys = path.split('.')
  let result = object
  keys.forEach((key: string) => {
    result = result[key] ?? ''
  })
  return result
}

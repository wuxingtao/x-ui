/**
 * @Desc: index
 * @Author: wu xingtao
 * @Date: 2021/5/15
 */
import { createBEM } from '@/utils/create/bem'
// import { createTranslate } from './translate'

export function createNamespace(name: string) {
  const prefixedName = `x-${name}`
  return [prefixedName, createBEM(prefixedName)] as const
}

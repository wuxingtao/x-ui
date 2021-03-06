/**
 * @Desc: index
 * @Author: wu xingtgao
 * @Date: 2021/1/25
 */
import { createComponent } from '@/utils/create/component'
import { createBEM } from '@/utils/create/bem'

export function createNamespace(name: string) {
  name = 'x-' + name
  return [createComponent(name), createBEM(name)] as const
}

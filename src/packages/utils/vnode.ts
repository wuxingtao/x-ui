/**
 * @Desc: vnode
 * @Author: wu xingtao
 * @Date: 2021/6/7
 */
import {Fragment,createBlock,openBlock} from 'vue'
import type { VNode, VNodeTypes, VNodeChild } from 'vue'
type Children = VNodeTypes[]|VNodeTypes

// 标识一个节点该如何进行更新的，参考vue3。
export enum PatchFlags {
  // 动态文字内容
  TEXT = 1,
  // 动态class 1 << 1
  CLASS = 2,
  // 动态样式 1 << 2
  STYLE = 4,
  // 动态 props
  PROPS = 8,
  FULL_PROPS = 16,
  HYDRATE_EVENTS = 32,
  STABLE_FRAGMENT = 64,
  KEYED_FRAGMENT = 128,
  UNKEYED_FRAGMENT = 256,
  NEED_PATCH = 512,
  DYNAMIC_SLOTS = 1024,
  HOISTED = -1,
  BAIL = -2,
}

export function renderBlock(
  node:VNodeTypes,
  props:any,
  children?:Children,
  patchFlag?:number,
  patchProps?:string[],
){
  return (openBlock(),createBlock(node,props,children,patchFlag,patchProps))
}

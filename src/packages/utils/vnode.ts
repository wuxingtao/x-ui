/**
 * @Desc: vnode
 * @Author: wu xingtao
 * @Date: 2021/6/7
 */
import {Fragment, Text, Comment,createBlock,openBlock} from 'vue'
import type { VNode, VNodeTypes, VNodeChild } from 'vue'
type Children = VNodeTypes[]|VNodeTypes

const TEMPLATE = 'template'

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

export const isFragment = (node: VNodeChild) => (node as VNode).type === Fragment

export const isText = (node: VNodeChild) => (node as VNode).type === Text

export const isComment = (node: VNodeChild) => (node as VNode).type === Comment

export const isTemplate = (node: VNodeChild) => (node as VNode).type === TEMPLATE

/**
 * get a valid child node (not fragment nor comment)
 * @param node {VNode} node to be searched
 * @param depth {number} depth to be searched
 */
function getChildren(node: VNode, depth: number): undefined | VNode {
  if (isComment(node)) return
  if (isFragment(node) || isTemplate(node)) {
    return depth > 0
      ? getFirstValidNode(node.children as VNodeChild, depth - 1)
      : undefined
  }
  return node
}

/**
 * determine if the element is a valid element type rather than fragments and comment e.g. <template> v-if
 * @param node {VNode} node to be tested
 */
export const isValidElementNode = (node: VNodeChild) =>
  !(isFragment(node) || isComment(node))

export const getFirstValidNode = (
  nodes: VNodeChild,
  maxDepth = 3,
): ReturnType<typeof getChildren> => {
  if (Array.isArray(nodes)) {
    return getChildren(nodes[0] as VNode, maxDepth)
  } else {
    return getChildren(nodes as VNode, maxDepth)
  }
}

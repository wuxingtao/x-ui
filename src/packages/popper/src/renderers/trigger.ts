/**
 * @Desc: trigger
 * @Author: wu xingtao
 * @Date: 2021/8/23
 */
import {cloneVNode} from 'vue'
import type {VNode,Ref,ComponentPublicInstance} from 'vue'
import {getFirstValidNode} from "@x-ui/utils/vnode";


type EventHandler = (e:Event)=>any
interface IRenderTriggerProps extends Record<string,unknown>{
  ref:string|Ref<ComponentPublicInstance|HTMLElement>
  onClick?:EventHandler,
  onMouseover?:EventHandler,
  onMouseleave?:EventHandler,
  onFocus?:EventHandler,
}


export default function renderTrigger(trigger:VNode[],extraProps:IRenderTriggerProps){
  const firstElement = getFirstValidNode(trigger,1)
  if(!firstElement){
    throw new Error('renderTrigger: trigger expects single rooted node')
  }
  return cloneVNode(firstElement,extraProps,true)
}

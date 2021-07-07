/**
 * @Desc: popper-options
 * @Author: wu xingtao
 * @Date: 2021/7/7
 */
import {computed} from 'vue'

import type {Ref} from 'vue'
import type {Options,Placement} from "@popperjs/core";

interface IUsePopperProps{
  popperOptions: Options
  arrowOffset:number
  offset:number
  placement:Placement,
  gpuAcceleration: boolean
}

interface IUsePopperState{
  arrow: Ref<HTMLElement>
}

export default function usePopperOptions(props:IUsePopperProps,state:IUsePopperState){
  return computed(()=>{
    return {
      placement: props.placement,
      ...props.popperOptions,
      // modifiers:{}
    }
  })
}

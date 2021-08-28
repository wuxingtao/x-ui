/**
 * @Desc: userPopover
 * @Author: wu xingtao
 * @Date: 2021/8/27
 */
import {computed,ref,watch} from 'vue'
import type {SetupContext} from 'vue'
import type {IPopperOptions} from "@x-ui/popper";
import {usePopper} from "@x-ui/popper"
import PopupManager from "@/utils/popup-manager";
import {isString} from "@/utils/util"
import { EmitType } from "@x-ui/popper/src/use-popper";

export interface IUsePopover extends IPopperOptions{
  width:number|string
}

export const SHOW_EVENT = 'show'
export const HIDE_EVENT = 'hide'

export default function usePopover(props:IUsePopover, ctx:SetupContext<string[]>){
  const zIndex = ref(PopupManager.nextZIndex())
  const width = computed(()=>{
    if(isString(props.width)){
      return props.width as string
    }
    return props.width + 'px'
  })

  const popperStyle = computed(()=>{
    return {
      width: width.value,
      zIndex: zIndex.value
    }
  })

  const popperProps = usePopper(props,ctx as SetupContext<EmitType[]>)

  watch(popperProps.visibility,val=>{
    if(val){
      zIndex.value = PopupManager.nextZIndex()
    }
    ctx.emit(val ? SHOW_EVENT:HIDE_EVENT)
  })
  return {
    ...popperProps,
    popperStyle
  }

}

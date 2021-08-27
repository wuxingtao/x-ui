/**
 * @Desc: userPopover
 * @Author: wu xingtao
 * @Date: 2021/8/27
 */
import {computed,ref,watch} from 'vue'
import type {SetupContext} from 'vue'
import type {IPopperOptions} from "@x-ui/popper";
import PopupManager from "@/utils/popup-manager";

export interface IUsePopover extends IPopperOptions{
  with:number|string
}

export function userPopover(props:IUsePopover,ctx:SetupContext<string[]>){
  const zIndex = ref(PopupManager.nextZIndex())
  const width = computed(()=>{

  })
}

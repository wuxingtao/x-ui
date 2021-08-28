/**
 * @Desc: use-popper
 * @Author: wu xingtao
 * @Date: 2021/6/7
 */
import {computed,ref,reactive,watch,CSSProperties} from 'vue'
import {createPopper} from '@popperjs/core'

import { generateId, isBool, isArray,$, isHTMLElement } from "@/utils/util";
import PopupManager from "@/utils/popup-manager";

import usePopperOptions from './popper-options'

import { ComponentPublicInstance,SetupContext,Ref } from 'vue'
import type {
  IPopperOptions,
  TriggerType,
  PopperInstance,
  RefElement,
} from './defaults'

export type ElementType = ComponentPublicInstance | HTMLElement
export type EmitType = 'update:visible' | 'after-enter' | 'after-leave' | 'before-enter' | 'before-leave'


export interface PopperEvents {
  onClick?: (e: Event) => void
  onMouseenter?: (e: Event) => void
  onMouseleave?: (e: Event) => void
  onFocus?: (e: Event) => void
  onBlur?: (e: Event) => void
}

export const DEFAULT_TRIGGER = ['hover']

export const UPDATE_VISIBLE_EVENT = 'update:visible'

export default function(
  props: IPopperOptions,
  { emit }: SetupContext<EmitType[]>
) {
  const arrowRef = ref<RefElement>(null)
  const triggerRef = ref(null) as Ref<ElementType>
  const popperRef = ref<RefElement>(null)

  const popperId = `x-popper-${generateId()}`
  let popperInstance:Nullable<PopperInstance> = null
  let showTimer: Nullable<TimeoutHandle> = null
  let hideTimer: Nullable<TimeoutHandle> = null
  let triggerFocused = false

  const isManualMode = () => props.manualMode || props.trigger === 'manual'

  const popperStyle = ref<CSSProperties>({ zIndex: PopupManager.nextZIndex() })

  const popperOptions = usePopperOptions(props,{
    arrow:arrowRef
  })

  const state = reactive({
    visible: !!props.visible
  })

  const visibility = computed<boolean>({
    get(){
      if(props.disabled){
        return false
      }else{
        return isBool(props.visible) ? props.visible : state.visible
      }
    },
    set(val){
      if(isManualMode()) return
      isBool(props.visible) ? emit(UPDATE_VISIBLE_EVENT,val) : (state.visible = val)
    }
  })

  // 内部显示函数
  function _show(){
    if(props.autoClose > 0){
      hideTimer = window.setTimeout(()=>{
        _hide()
      },props.autoClose)
    }
    visibility.value = true
  }

  function _hide(){
    visibility.value = false
  }

  function clearTimers(){
    clearTimeout(showTimer)
    clearTimeout(hideTimer)
  }

  const show = ()=>{
    if(isManualMode() || props.disabled) return
    clearTimers()
    if(props.showAfter === 0){
      _show()
    }else{
      showTimer = window.setTimeout(()=>{
        _show()
      },props.showAfter)
    }
  }

  const hide = ()=>{
    if (isManualMode()) return
    clearTimers()
    if(props.hideAfter > 0){
      hideTimer = window.setTimeout(()=>{
        close()
      },props.hideAfter)
    }else{
      close()
    }
  }

  const close = ()=>{
    _hide()
    if(props.disabled){
      doDestroy(true)
    }
  }

  // 初始化popper
  function initializePopper(){
    if(!$(visibility)){
      return
    }
    const unwrappedTrigger = $(triggerRef)
    const _trigger = isHTMLElement(unwrappedTrigger) ? unwrappedTrigger : (unwrappedTrigger as ComponentPublicInstance).$el
    popperInstance = createPopper(_trigger,$(popperRef),$(popperOptions))
  }

  function doDestroy(forceDestroy?: boolean) {
    /* istanbul ignore if */
    if (!popperInstance || ($(visibility) && !forceDestroy)) return
    detachPopper()
  }
  // 分离popper
  function detachPopper() {
    popperInstance?.destroy?.()
    popperInstance = null
  }

  const events = {} as PopperEvents

  function update(){
    if(!$(visibility)){
      return
    }
    if(popperInstance){
      popperInstance.update()
    }else{
      initializePopper()
    }
  }

  function onVisibilityChange(toState:boolean){
    if(toState){
      popperStyle.value.zIndex = PopupManager.nextZIndex()
      initializePopper()
    }
  }

  if (!isManualMode()) {
    const toggleState = () => {
      if ($(visibility)) {
        hide()
      } else {
        show()
      }
    }

    const popperEventsHandler = (e: Event) => {
      e.stopPropagation()
      switch (e.type) {
        case 'click': {
          if (triggerFocused) {
            // reset previous focus event
            triggerFocused = false
          } else {
            toggleState()
          }
          break
        }
        case 'mouseenter': {
          show()
          break
        }
        case 'mouseleave': {
          hide()
          break
        }
        case 'focus': {
          triggerFocused = true
          show()
          break
        }
        case 'blur': {
          triggerFocused = false
          hide()
          break
        }
      }
    }

    const triggerEventsMap: Partial<Record<TriggerType, (keyof PopperEvents)[]>> = {
      click: ['onClick'],
      hover: ['onMouseenter', 'onMouseleave'],
      focus: ['onFocus', 'onBlur'],
    }

    const mapEvents = (t: TriggerType) => {
      triggerEventsMap[t].forEach(event => {
        events[event] = popperEventsHandler
      })
    }

    if (isArray(props.trigger)) {
      Object.values(props.trigger).map(mapEvents)
    } else {
      mapEvents(props.trigger as TriggerType)
    }
  }

  watch(popperOptions,val=>{
    if (!popperInstance) return
    popperInstance.setOptions(val)
    popperInstance.update()
  })

  watch(visibility,onVisibilityChange)

  return {
    update,
    doDestroy,
    show,
    hide,
    onAfterEnter: () => {
      emit('after-enter')
    },
    onAfterLeave: () => {
      detachPopper()
      emit('after-leave')
    },
    onBeforeEnter: () => {
      emit('before-enter')
    },
    onBeforeLeave: () => {
      emit('before-leave')
    },
    initializePopper,
    isManualMode,
    arrowRef,
    events,
    popperId,
    popperInstance,
    popperRef,
    popperStyle,
    triggerRef,
    visibility
  }

}

export * from './defaults'

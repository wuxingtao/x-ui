/**
 * @Desc: defaults
 * @Author: wu xingtao
 * @Date: 2021/6/7
 */
import type { PropType } from 'vue'
import type { Placement, PositioningStrategy, Instance as PopperInstance, Options } from '@popperjs/core'

export enum Effect {
  DARK = 'dark',
  LIGHT = 'light'
}

export type RefElement = Nullable<HTMLElement>
export type Offset = [number,number] | number

export type {Placement,PositioningStrategy,PopperInstance,Options}

export type TriggerType = 'click' | 'hover' | 'focus' | 'manual'

export type Trigger = TriggerType | TriggerType[]

export type IPopperOptions = {
  arrowOffset: number
  autoClose: number // 出现后自动隐藏延时,x秒后隐藏
  boundariesPadding: number
  class: string
  cutoff: boolean
  disabled: boolean // Popover 是否可用
  enterable: boolean
  hideAfter: number
  manualMode: boolean
  offset: number
  placement: Placement
  popperOptions: Options
  showAfter: number // 延迟出现，单位毫秒
  showArrow: boolean
  strategy: PositioningStrategy
  trigger: Trigger
  visible: boolean // 状态是否可见
  stopPopperMouseEvent: boolean
  gpuAcceleration: boolean
}

export const DEFAULT_TRIGGER = 'hover'

export default {
  // the arrow size is an equailateral triangle with 10px side length, the 3rd side length ~ 14.1px
  // adding a offset to the ceil of 4.1 should be 5 this resolves the problem of arrow overflowing out of popper.
  arrowOffset: {
    type: Number,
    default: 5,
  },
  appendToBody: {
    type: Boolean,
    default: true,
  },
  autoClose: {
    type: Number,
    default: 0,
  },
  boundariesPadding: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
    default: '',
  },
  class: {
    type: String,
    default: '',
  },
  style: Object,
  hideAfter: {
    type: Number,
    default: 200,
  },
  cutoff: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  effect: {
    type: String as PropType<Effect>,
    default: Effect.DARK,
  },
  enterable: {
    type: Boolean,
    default: true,
  },
  manualMode: {
    type: Boolean,
    default: false,
  },
  showAfter: {
    type: Number,
    default: 0,
  },
  offset: {
    type: Number,
    default: 12,
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom' as Placement,
  },
  popperClass: {
    type: String,
    default: '',
  },
  pure: {
    type: Boolean,
    default: false,
  },
  // Once this option were given, the entire popper is under the users' control, top priority
  popperOptions: {
    type: Object as PropType<Options>,
    default: () => null,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
  strategy: {
    type: String as PropType<PositioningStrategy>,
    default: 'fixed' as PositioningStrategy,
  },
  transition: {
    type: String,
    default: 'el-fade-in-linear',
  },
  trigger: {
    type: [String, Array] as PropType<Trigger>,
    default: DEFAULT_TRIGGER,
  },
  visible: {
    type: Boolean,
    default: undefined,
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true,
  },
  gpuAcceleration: {
    type: Boolean,
    default: true,
  },
}

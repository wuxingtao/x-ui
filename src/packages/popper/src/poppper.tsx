import {
  createVNode,
  defineComponent,
  Fragment,
  Teleport,
  renderSlot,
  toDisplayString,
  onMounted,
  onBeforeUnmount,
  withDirectives
} from 'vue'
import { createNamespace } from '@/utils/create'
import { PatchFlags, renderBlock } from '@x-ui/utils/vnode'
import { renderPopper, renderTrigger } from '@x-ui/popper/src/renderers'

import defaultProps from './use-popper/defaults'
import usePopper from './use-popper/index'

const [name, bem] = createNamespace('popper')

export type triggerType = 'click' | 'focus' | 'hover' | 'manual'

const UPDATE_VISIBLE_EVENT = 'update:visible'

export default defineComponent({
  name,
  props: defaultProps,
  emits: [
    UPDATE_VISIBLE_EVENT,
    'after-enter',
    'after-leave',
    'before-enter',
    'before-leave'
  ],
  setup(props, ctx) {
    if (!ctx.slots.trigger) {
      // throwError(name, 'Trigger must be provided')
      throw new Error(name + ': Trigger must be provided')
    }
    const popperStates = usePopper(props, ctx)
    const forceDestroy = () => popperStates.doDestroy(true)

    onMounted(popperStates.initializePopper)
    onBeforeUnmount(forceDestroy)

    return popperStates
  },
  render() {
    const {
      $slots,
      class: kls,
      style,
      effect,
      hide,
      onPopperMouseEnter,
      onPopperMouseLeave,
      onAfterEnter,
      onAfterLeave,
      onBeforeEnter,
      onBeforeLeave,
      popperClass,
      popperId,
      popperStyle,
      transition,
      visibility,
      stopPopperMouseEvent
    } = this
    const popper = renderPopper(
      {
        effect,
        name: transition,
        popperClass,
        popperId,
        popperStyle,
        stopPopperMouseEvent,
        onMouseenter: onPopperMouseEnter,
        onMouseleave: onPopperMouseLeave,
        onAfterEnter,
        onAfterLeave,
        onBeforeEnter,
        onBeforeLeave,
        visibility
      },
      [
        renderSlot($slots, 'default', {}, () => {
          return [toDisplayString(this.content)]
        })
      ]
    )

    const _t = $slots.trigger?.()

    const triggerProps = {
      ariaDescribedby: popperId,
      class: kls,
      style,
      ref: 'triggerRef',
      ...this.events
    }

    const trigger = withDirectives(renderTrigger(_t, triggerProps), [[hide]])

    return renderBlock(Fragment, null, [
      trigger,
      createVNode(
        Teleport as any, // Vue did not support createVNode for Teleport
        {
          to: 'body'
        },
        [popper],
        PatchFlags.PROPS,
        ['disabled']
      )
    ])
  }
})

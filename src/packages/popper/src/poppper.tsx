import {
  createVNode,
  defineComponent,
  Fragment,
  Teleport,
  renderSlot,
  toDisplayString,
  onMounted,
  onBeforeUnmount
} from 'vue'
import { createNamespace } from '@/utils/create'
import { PatchFlags, renderBlock } from '@x-ui/utils/vnode'
import renderPopper from '@x-ui/popper/src/renderers/popper'

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
      // throwError(compName, 'Trigger must be provided')
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
      style,
      effect,
      hide,
      popperClass,
      popperId,
      popperStyle,
      transition
    } = this
    const trigger = 'div'
    const popper = renderPopper(
      {
        effect,
        name: transition,
        popperClass,
        popperId,
        popperStyle
      },
      [
        renderSlot($slots, 'default', {}, () => {
          return [toDisplayString(this.content)]
        })
      ]
    )
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

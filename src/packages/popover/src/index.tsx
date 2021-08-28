import { defineComponent, reactive, toRefs,Fragment,Teleport,toDisplayString,createCommentVNode,createTextVNode,createVNode,renderSlot } from 'vue'
import { createNamespace } from '@/utils/create'
import Popover from '@x-ui/popover'
import {defaultProps,Effect} from "@x-ui/popper";
import {renderPopper,renderTrigger} from "@x-ui/popper";
import { renderIf,renderBlock,PatchFlags } from "@x-ui/utils/vnode";
import usePopover,{SHOW_EVENT,HIDE_EVENT} from "@x-ui/popover/src/usePopover";

import type {PropType} from 'vue'
import type {TriggerType} from "@x-ui/popper/src/use-popper";

const emits = ['update:visible', 'after-enter', 'after-leave', SHOW_EVENT, HIDE_EVENT ]
const _hoist = { key: 0, class: 'el-popover__title', role: 'title' }


const [name, bem] = createNamespace('popover')
export default defineComponent({
  name,
  components: { Popover },
  props: {
    ...defaultProps,
    content:{
      type:String,
    },
    trigger:{
      type:String as PropType<TriggerType>,
      default: 'click'
    },
    title:{
      type:String
    },
    width:{
      type:[String,Number],
      default:150
    },
    appendToBody:{
      type:Boolean,
      default:true
    }
  },
  emits,
  setup(props,ctx) {
    if (process.env.NODE_ENV !== 'production' && props.visible && !ctx.slots.reference) {
      // warn(NAME, `
      //   You cannot init popover without given reference
      // `)
      console.log(`${name} You cannot init popover without given reference`)
    }
    // @ts-ignore
    const states = usePopover(props,ctx)

    return states
  },
  render(){
    const {$slots} = this
    const trigger = $slots.reference ? $slots.reference(): null
    const title = renderIf(this.title,'div',_hoist,toDisplayString(this.title),PatchFlags.TEXT)

    const content = renderSlot($slots,'default',{},()=>[createTextVNode(toDisplayString(this.content),PatchFlags.TEXT)])

    const {
      events,
      onAfterEnter,
      onAfterLeave,
      onPopperMouseEnter,
      onPopperMouseLeave,
      popperStyle,
      popperId,
      popperClass,
      showArrow,
      transition,
      visibility,
    } = this

    const kls = [
      this.content ? 'x-popover--plain' : '',
      'x-popover',
      popperClass
    ].join(' ')

    let popover = renderPopper({
      effect: Effect.LIGHT,
      name:transition,
      popperClass:kls,
      popperStyle:popperStyle,
      popperId,
      visibility,
      onMouseenter: onPopperMouseEnter,
      onMouseleave: onPopperMouseLeave,
      onAfterEnter,
      onAfterLeave,
      stopPopperMouseEvent: false,
    },[
      title,
      content,
      // renderArrow(showArrow),
    ])

    const _trigger = trigger ? renderTrigger(trigger,{
      ariaDescribedby: popperId,
      ref: 'triggerRef',
      ...events,
    }) : createCommentVNode('v-if',true)

    return renderBlock(Fragment,null,[
      // this.trigger === 'click'
      //   ? withDirectives(_trigger, [[ClickOutside, this.hide]])
      //   : _trigger,
      _trigger,
      createVNode(Teleport as any, {
        disabled: !this.appendToBody,
        to: 'body',
      }, [popover], PatchFlags.PROPS, ['disabled']),
    ])
  }
})

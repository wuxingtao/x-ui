import { defineComponent, Fragment, PropType, createVNode, Teleport } from 'vue'
import { createNamespace } from '@/utils/create'
import { renderBlock } from '@x-ui/utils/vnode'
import renderPopper from '@x-ui/popper/src/renderers/popper_old'

const [name, bem] = createNamespace('popper')

export type triggerType = 'click' | 'focus' | 'hover' | 'manual'

export default defineComponent({
  name,
  props: {
    trigger: {
      type: String as PropType<triggerType>,
      default: 'click'
    },
    width: {
      type: String,
      default: '150'
    },
    // 默认出现位置
    placement: {
      type: String,
      default: 'bottom'
    },
    // 为 popper 添加类名
    popperClass: {
      type: String,
      default: ''
    },
    tabindex: {
      type: Number,
      default: null
    },
    content: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    function onClick(event: MouseEvent) {
      event.preventDefault()
      const target = event.currentTarget
      const Rect = target?.getBoundingClientRect()
      console.log(Rect)
      createPopper(Rect)
    }
    // TODO：弃用 改为vue vnode渲染
    function createPopper(Rect) {
      const { top, bottom, left, right, height, width } = Rect
      const { content, width: propsWidth } = props
      const padding = 12
      const popperDom = document.createElement('div')
      popperDom.id = '111'
      popperDom.append(content)
      popperDom.style.cssText = `position:absolute;
      top:${top + height + padding}px;
      left:${left - (Number(propsWidth) - width) / 2}px;
      width:${props.width}px;
      border:1px solid blue;`
      document.body.appendChild(popperDom)
    }
    return () => {
      const { content } = props
      const classes = bem([name])
      return (
        <div className={classes} onClick={onClick}>
          {slots.default ? slots.default() : ''}
        </div>
      )
    }
  },
  render() {
    const trigger = 'div'
    const popper = ''
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

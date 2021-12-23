/**
 * @Desc: index
 * @Author: wu xingtgao
 * @Date: 2021/1/19
 */
import { PropType, CSSProperties, defineComponent } from 'vue'
// utils
import { createNamespace } from '@/utils/create'

const [name, bem] = createNamespace('button')

export type ButtonSize = 'normal' | 'small' | 'mini'

export type ButtonType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'

export default defineComponent({
  // name: 'XButton', name在createNamespace 实现
  name,
  props: {
    text: String,
    icon: String,
    color: String,
    loading: Boolean,
    disabled: Boolean,
    loadingText: String,
    tag: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'button'
    },
    type: {
      type: String as PropType<ButtonType>,
      default: 'default'
    },
    size: {
      type: String,
      default: 'normal'
    },
    nativeType: {
      type: String,
      default: 'button'
    }
  },
  emits: ['click'],
  setup: (props, { emit, slots }) => {
    // const renderText = () => {
    //   let text
    //   if (props.loading) {
    //     text = props.loadingText
    //   } else {
    //     text = slots.default ? slots.default() : props.text
    //   }
    //   if (text) {
    //     return _createVNode(
    //       'span',
    //       {
    //         class: 'text'
    //       },
    //       text
    //     )
    //   }
    // }
    const renderText = () => {
      let text
      if (props.loading) {
        text = props.loadingText
      } else {
        text = slots.default ? slots.default() : props.text
      }
      if (text) {
        return <span class={bem('text')}>{text}</span>
      }
    }
    const getStyle = () => {
      const style: CSSProperties = {}
      return style
    }

    const onClick = (event: MouseEvent) => {
      if (props.loading) {
        event.preventDefault()
      }
      if (!props.loading && !props.disabled) {
        emit('click', event)
      }
    }
    return () => {
      const { tag, type, size, disabled, nativeType } = props
      const classes = [bem([type, size, tag, {}])]
      return (
        <tag
          type={nativeType}
          class={classes}
          style={getStyle()}
          disabled={disabled}
          onClick={onClick}
        >
          <div class={bem('content')}>{renderText()}</div>
        </tag>
      )
    }
  }
})

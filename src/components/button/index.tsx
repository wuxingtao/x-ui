/**
 * @Desc: index
 * @Author: wu xingtgao
 * @Date: 2021/1/19
 */
import { createVNode as _createVNode, SetupContext } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import _extends from '@babel/runtime/helpers/esm/extends'
// utils
import { createNamespace } from '@/utils/create'

const _createNamespace = createNamespace('button'),
  createComponent = _createNamespace[0]

export default createComponent({
  // _extends({},routeProps,{})
  props: _extends(
    {},
    {
      text: String,
      icon: String,
      color: String,
      loading: Boolean,
      size: {
        type: String,
        default: 'normal'
      }
    }
  ),
  emits: ['click'],
  setup: (props, ctx: SetupContext) => {
    const emit = ctx.emit,
      slots = ctx.slots
    const renderText = () => {
      let text
      if (props.loading) {
        text = props.loadingText
      } else {
        text = slots.default ? slots.default() : props.text
      }
      if (text) {
        return _createVNode(
          'span',
          {
            class: 'text'
          },
          text
        )
      }
    }
  }
})

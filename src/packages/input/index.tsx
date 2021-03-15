/**
 * @Desc: index
 * @Author: wu xingtao
 * @Date: 2021/3/1
 */
import { createNamespace } from '@/utils/create'
import { CSSProperties, PropType } from 'vue'

const [createComponent, bem] = createNamespace('input')

export default createComponent({
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  },
  setup: (props, { emit, slots }) => {
    const getStyle = () => {
      const style: CSSProperties = {}
      return style
    }
    return () => {
      const { type, value, disabled } = props
      const classes = [bem([type, disabled, {}])]
      return <input value={value} />
    }
  }
})

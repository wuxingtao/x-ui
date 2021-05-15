/**
 * @Desc: index
 * @Author: wu xingtao
 * @Date: 2021/3/1
 */
import { createNamespace } from '@/utils/create/index_old'
import { CSSProperties, PropType } from 'vue'

const [createComponent, bem] = createNamespace('input')

type AutosizeProp =
  | {
      minRows?: number
      maxRows?: number
    }
  | boolean

export default createComponent({
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    autosize: {
      type: [Boolean, Object] as PropType<AutosizeProp>
    },
    placeholder: {
      type: String
    },
    form: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    prefixIcon: {
      type: String,
      default: ''
    },
    label: {
      type: String
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

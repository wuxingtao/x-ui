import { defineComponent, PropType } from 'vue'
import { createNamespace } from '@/utils/create'
import XInput from '@x-ui/input'

const [name, bem] = createNamespace('select')

export type Size = 'medium|small|mini'

export default defineComponent({
  name,
  components: {
    XInput
  },
  props: {
    tag: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'div'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    name: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: ''
    },
    placeholder: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: ''
    },
    size: {
      type: String as PropType<Size>,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit, slots }) {
    return () => {
      const { tag, size, value, readonly } = props
      const classes = [bem(size)]
      return (
        <tag className={classes}>
          <div class="select-trigger">
            <x-input value={value} type="text" readonly={readonly} />
          </div>
        </tag>
      )
    }
  }
})

import { computed, PropType, defineComponent } from 'vue'
import { createNamespace } from '@/utils/create'
const [createComponent, bem] = createNamespace('row')
export default createComponent({
  props: {
    tag: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'div'
    }
  },
  setup: (props, { emit, slots }) => {
    const { tag } = props
    const classes = [bem()]
    return () => {
      return <tag class={classes}>{slots.default?.()}</tag>
    }
  }
})

import { computed, PropType, defineComponent } from 'vue'
import { createNamespace } from '@/utils/create'
const [createComponent, bem] = createNamespace('col')
export default createComponent({
  props: {
    tag: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'div'
    },
    span: {
      type: String,
      default: '8'
    },
    offset: [Number, String],
    xs: [Number, String],
    sm: [Number, String],
    md: [Number, String],
    lg: [Number, String],
    xl: [Number, String]
  },
  setup: (props, { emit, slots }) => {
    const { tag, span, offset, xs, sm, md, lg, xl } = props
    const classes = bem({
      [span]: span,
      [`offset-${offset}`]: offset,
      [`xs-${xs}`]: xs,
      [`sm-${sm}`]: sm,
      [`md-${md}`]: md,
      [`lg-${lg}`]: lg,
      [`xl-${xl}`]: xl
    })
    return () => {
      return <tag class={classes}>{slots.default?.()}</tag>
    }
  }
})

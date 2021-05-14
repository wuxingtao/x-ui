/**
 * @Desc: Col.stories
 * @Author: wu xingtao
 * @Date: 2021/5/12
 */
import { XCol, XRow } from '@/packages/indexGroup'
export default {
  title: 'XUI/Col',
  component: XCol,
  argTypes: {
    span: '8',
    offset: '0',
    xs: 8,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 11
  }
}

const Template = args => ({
  components: { XCol, XRow },
  setup() {
    return { args }
  },
  template:
    '<x-row><x-col v-bind="args"><span>span1</span></x-col><x-col v-bind="args"><span>span2</span></x-col></x-row>'
})

export const Primary = Template.bind({})

Primary.args = {
  span: '8',
  offset: '2'
}

export const Size = Template.bind({})

Size.args = {
  xs: 4,
  sm: 6,
  md: 6,
  lg: 8,
  xl: 11
}

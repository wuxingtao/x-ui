import { XSelect } from '@/packages/indexGroup'
export default {
  title: 'XUI/Select',
  component: XSelect,
  argTypes: {
    size: {
      control: { type: 'select', options: ['mini', 'small', 'medium'] }
    },
    placeholder: ''
  }
}

const Template = args => ({
  components: { XSelect },
  setup() {
    return { args }
  },
  template: '<x-select v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary',
  size: 'medium',
  value: '默认值',
  placeholder: '请输入'
}

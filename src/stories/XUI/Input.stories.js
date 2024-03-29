import XInput from '@/packages/input/index.tsx'

export default {
  title: 'XUI/Input',
  component: XInput,
  argTypes: {
    placeholder: '请输入',
    value: ''
  }
}

const Template = args => ({
  components: { XInput },
  setup() {
    return { args }
  },
  template: '<x-input v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Input',
  placeholder: '请输入',
  value: ''
}

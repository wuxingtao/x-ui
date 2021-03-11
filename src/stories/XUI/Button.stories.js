import { XButton } from '@/components/indexGroup'
import '@/components/button/index.scss'
export default {
  title: 'XUI/Button',
  component: XButton,
  argTypes: {}
}

const Template = args => ({
  components: { XButton },
  setup() {
    return { args }
  },
  template: '<x-button v-bind="args">Button test</x-button>'
})

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  value: 'button'
}

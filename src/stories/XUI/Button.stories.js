import { XButton } from '@/packages/indexGroup'
import '@/packages/button/index.scss'
export default {
  title: 'XUI/Button',
  component: XButton,
  argTypes: {
    size: {
      control: { type: 'select', options: ['mini', 'small', 'medium'] }
    },
    type: {
      control: {
        type: 'select',
        options: ['primary', 'success', 'warning', 'danger', 'info']
      }
    },
    onClick: {}
  }
}

const Template = args => ({
  components: { XButton },
  setup() {
    return { args }
  },
  template: '<x-button v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary',
  size: 'medium',
  text: 'Button'
}

export const Secondary = Template.bind({})
Secondary.args = {
  text: 'Button Secondary'
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  text: 'Button large'
}

import { XPopper } from '@/packages/indexGroup'
import { XButton } from '@/packages/indexGroup'

export default {
  title: 'XUI/Popper',
  component: XPopper,
  argTypes: {
    trigger: {
      control: {
        type: 'select',
        options: ['click', 'focus', 'hover', 'manual']
      }
    },
    content: ''
  }
}

const Template = (args, buttonArgs) => ({
  components: { XPopper, XButton },
  setup() {
    return { args, buttonArgs }
  },
  template:
    '<x-popper v-bind="args" style="margin-left:200px;"><template #trigger><x-button>按钮测试</x-button></template></x-popper>'
})

export const Primary = Template.bind({})
Primary.args = {
  trigger: 'click',
  content: '这是一段内容'
}

Primary.buttonArgs = {
  placeholder: '请输入'
}

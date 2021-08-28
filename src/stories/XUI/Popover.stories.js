import { XPopover } from '@/packages/indexGroup'
import { XButton } from '@/packages/indexGroup'

export default {
  title: 'XUI/Popover',
  component: XPopover,
  argTypes: {
    trigger: {
      control: {
        type: 'select',
        options: ['click', 'focus', 'hover', 'manual']
      }
    },
    placeholder: '',
    content: ''
  }
}

const Template = args => ({
  components: { XPopover, XButton },
  setup() {
    return { args }
  },
  template:
    '<x-popover v-bind="args" style="margin-left:200px;"><template #reference><x-button>按钮测试</x-button></template></x-popover>'
})

export const Primary = Template.bind({})
Primary.args = {
  trigger: 'click',
  placeholder: '请输入',
  content: '这是一段内容',
  visibility: false
}

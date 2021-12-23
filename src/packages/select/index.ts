/**
 * @Desc: index
 * @Author: wu xingtao
 * @Date: 2021/5/17
 */
import { withInstall } from '@/utils/with-install'
import _Select from './select'

const Select = withInstall<typeof _Select>(_Select)

export default Select
export { Select }

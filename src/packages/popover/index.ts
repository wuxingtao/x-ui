/**
 * @Desc: index
 * @Author: wu xingtao
 * @Date: 2021/8/27
 */
import _Popover from './src/index'
import { withInstall } from '@/utils/with-install'

const Popover = withInstall<typeof _Popover>(_Popover)

export default Popover

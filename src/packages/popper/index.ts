/**
 * @Desc: index
 * @Author: wu xingtao
 * @Date: 2021/6/2
 */
import { withInstall } from '@/utils/with-install'
import _Popper from './src/poppper'
const Popper = withInstall<typeof _Popper>(_Popper)

export default Popper
export { Popper }

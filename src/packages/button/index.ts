/**
 * @Desc: index
 * @Author: wu xingtao
 * @Date: 2021/5/15
 */
import {withInstall} from "@/utils/with-install";
import _Button from './Button'

const Button = withInstall<typeof _Button>(_Button)

export default Button
export {Button}
export type {ButtonType,ButtonSize} from './Button'

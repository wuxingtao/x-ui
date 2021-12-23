/**
 * @Desc: vue-shim.d
 * @Author: wu xingtao
 * @Date: 2021/7/5
 */
declare type Nullable<T> = T | null

declare type Indexable<T> = {
  [key: string]: T
}

declare type Hash<T> = Indexable<T>

declare type TimeoutHandle = ReturnType<typeof global.setTimeout>

declare type ComponentSize = 'large' | 'medium' | 'small' | 'mini'

export interface IBindParams {
  //target里面的属性值
  valuePropName?: string
  //触发值变化
  trigger?: string
  //是否接管输入输出控制，normal 类型默认true，其它默认 false
  withBind?: boolean,
}
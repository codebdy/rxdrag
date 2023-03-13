export interface INodeMeta<IField = any, INodeController = any> {
  componentName: string,
  props?: {
    [key: string]: any,
  },
  "x-field"?: IField,
  "x-controller"?: INodeController,
  //锁定子控件
  locked?: boolean,
  //自己渲染，引擎不渲染
  selfRender?: boolean,
}

export interface INodeSchema<IField = any, IReactions = any> extends INodeMeta<IField, IReactions> {
  //name?: string,
  //引用一段schema，ref赋值name，用于框架等分块编辑
  //ref?: string,
  children?: INodeSchema[]
  slots?: {
    [name: string]: INodeSchema | undefined
  }
}

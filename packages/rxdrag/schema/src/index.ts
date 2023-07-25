export interface INodeMeta<
  Field = unknown,
  NodeController = unknown
> {
  componentName: string;
  props?: {
    [key: string]: unknown;
  };
  'x-field'?: Field;
  //节点控制器，逻辑编排用
  'x-controller'?: NodeController;
  //锁定子控件
  locked?: boolean;
  //自己渲染，引擎不渲染
  selfRender?: boolean;
  //属性表达式，这算是低代码平台的扩展
  propExpressions?: {
    [key: string]: string | undefined;
  };
}

export interface INodeSchema<Field = unknown, NodeController = unknown>
  extends INodeMeta<Field, NodeController> {
  //name?: string,
  //引用一段schema，ref赋值name，用于框架等分块编辑
  //ref?: string,
  children?: INodeSchema[];
  slots?: {
    [name: string]: INodeSchema | undefined;
  };
}

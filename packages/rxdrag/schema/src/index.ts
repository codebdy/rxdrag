export interface INodeMeta<
  Field = unknown,
  NodeController = unknown
> {
  //特殊类型节点通过这个字段区别，比如Fragment，FreedomGroup
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
  children?: INodeSchema[];
  slots?: {
    [name: string]: INodeSchema | undefined;
  };
}

export enum ViewType {
  Main = "main",
  Drawer = "drawwer",
  Dialog = "dialog",
  RoutePage = "route-page",
}

//一个document schema对应一个场景
export interface IViewSchema<Field = unknown, NodeController = unknown> {
  schema: INodeSchema<Field, NodeController>,
  id?: string,
  title?: string,
  //视图类型，用于同一画布编辑多个document
  viewType?: ViewType,
}

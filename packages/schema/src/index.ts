export interface INodeMeta<
  ModelData = unknown,
  NodeController = unknown
> {
  //组件名称
  componentName: string;
  props?: Record<string, unknown>;
  'x-data'?: ModelData;
  //节点控制器，逻辑编排用
  'x-controller'?: NodeController;
  //锁定子控件
  locked?: boolean;
  //自己渲染，引擎不渲染
  selfRender?: boolean;

  //props的表达式
  exprs?: Record<string, string | null>;
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
  Drawer = "drawer",
  Dialog = "dialog",
  RoutePage = "route-page",
}

//一个document schema对应一个场景
export interface IViewSchema<Field = unknown, NodeController = unknown> {
  schema: INodeSchema<Field, NodeController>,
  id: string,
  title?: string,
  //视图类型，用于同一画布编辑多个document
  viewType?: ViewType,
}

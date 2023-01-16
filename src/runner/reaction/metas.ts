export interface IX6PortMeta {
  id: string;
  group: "in" | "out";
}

export interface IX6NodeMeta {
  id: string;
  /** 节点x坐标 */
  x?: number;
  /** 节点y坐标  */
  y?: number;
  /** 节点宽度 */
  width?: number;
  /** 节点高度 */
  height?: number;
  ports?: IX6PortMeta[];
}

export interface IX6EdgeMeta {
  id: string;
  sourceAnchor: any;
  targetAnchor: any;
}

// export enum NodeType {
//   Start = "Start",
//   ComponentMethod = "ComponentMethod",
//   Function = "Function",
// }

export interface INodeMeta {
  uuid: string;
  title?: string;
}

export interface IStartNodeMeta extends INodeMeta {
}

export interface IComponentMethodNodeMeta extends INodeMeta {
  componentName: string
  methodName: string
}

export interface IFunctionNodeMeta extends INodeMeta {
  functionName: string
}

export interface IEndNodeMeta extends INodeMeta {
  name: string
}

export interface IInvokeMeta {
  uuid: string;
  source: {
    nodeUuid: string;
    outputUuid: string;
  }
  target: {
    nodeUuid: string;
    inputUuid: string;
  };
}

export interface IReactionMetas {
  nodes: INodeMeta[]
  invakes: IInvokeMeta[]
  x6Nodes: IX6NodeMeta[]
  x6Edges: IX6EdgeMeta[]
}

export interface IPortMeta {
  name: string
  title?: string
  group: "in" | "out";
}

export interface IFunctionMeta {
  uuid: string,
  name?: string,
  inputs?: IPortMeta[],
  outputs?: IPortMeta[],
  metas?: IReactionMetas,
}

export interface IEventMeta extends IFunctionMeta {
  uuid: string,
  title?: string,
  name?: string,
  metas?: IReactionMetas,
}

// $form 虚拟表单， 
// $field 当前字段, 设置字段：$field.setValue
// $self 组件，设置组件属性:$self.setProps({dataSource:[...]}), 
export interface IReactionsMeta {
  uuid: string,
  events?: {
    [key: string]: IEventMeta | undefined
  },
  methods?: {
    [name: string]: IFunctionMeta | undefined
  },
  variables?: string[],
}
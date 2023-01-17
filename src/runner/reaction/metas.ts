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
  name: string
}

export interface IReactionNodeMeta extends INodeMeta {
  componentName: string
  methodName: string
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

export interface IReactionMeta {
  uuid: string,
  name?: string,
  title?: string,
  inputs?: IPortMeta[],
  outputs?: IPortMeta[],
  metas?: IReactionMetas,
}

// $form 虚拟表单， 
// $field 当前字段, 设置字段：$field.setValue
// $self 组件，设置组件属性:$self.setProps({dataSource:[...]}), 
export interface IControllerMeta {
  uuid: string,
  events?: {
    [key: string]: IReactionMeta | undefined
  },
  reactions?: {
    [name: string]: IReactionMeta | undefined
  },
  variables?: string[],
}
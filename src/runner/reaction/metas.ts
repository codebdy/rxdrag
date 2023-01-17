export interface IX6PortMeta {
  group: "in" | "out";
}

export interface IX6NodeMeta {
  /** 节点x坐标 */
  x?: number;
  /** 节点y坐标  */
  y?: number;
  /** 节点宽度 */
  width?: number;
  /** 节点高度 */
  height?: number;
}

export interface IX6EdgeMeta {
  sourceAnchor: any;
  targetAnchor: any;
}

export interface INodeMeta {
  uuid: string;
  label?: string;
  x6Node?: IX6NodeMeta;
}

export interface IStartNodeMeta extends INodeMeta {
  name: string;
  x6Node?: IX6NodeMeta;
}

export interface IEndNodeMeta extends INodeMeta {
  name: string;
  x6Node?: IX6NodeMeta;
}

export interface IPortMeta {
  uuid: string;
  name: string;
  label?: string;
  x6Port?: IX6PortMeta;
}

export interface IReactionNodeMeta extends INodeMeta {
  uuid: string;
  componentName: string;
  reactionName: string;
  inPorts: IPortMeta[];
  outPorts: IPortMeta[];
  x6Node?: IX6NodeMeta;
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
  x6Edge: IX6EdgeMeta;
}

export interface ILogicMetas {
  inputs: IStartNodeMeta[];
  outputs: IEndNodeMeta[];
  reactions: IReactionNodeMeta[];
  invakes: IInvokeMeta[];
}

export interface IReactionMeta {
  uuid: string,
  name?: string,
  title?: string,
  logicMetas?: ILogicMetas,
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
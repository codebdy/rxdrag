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

export interface ICallMeta {
  uuid: string;
  source: {
    functionUuid: string;
    outputUuid: string;
  }
  target: {
    functionUuid: string;
    inputUuid: string;
  };
}

export interface IPipesMeta {
  x6Nodes: IX6NodeMeta[]
  x6Edges: IX6EdgeMeta[]
}

export interface IPointMeta {
  uuid: string
  name: string
  title?: string
}

export interface IFunctionMeta {
  uuid: string,
  name?: string,
  inputs?: IPointMeta[],
  outputs?: IPointMeta[],
  metas?: IPipesMeta,
}

export interface IEventMeta extends IFunctionMeta {
  uuid: string,
  title?: string,
  name?: string,
  metas?: IPipesMeta,
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
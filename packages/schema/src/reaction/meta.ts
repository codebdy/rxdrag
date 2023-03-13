export interface IX6NodeMeta {
  /** 节点x坐标 */
  x: number;
  /** 节点y坐标  */
  y: number;
  /** 节点宽度 */
  width: number;
  /** 节点高度 */
  height: number;
}

export interface IPortMeta {
  id: string;
  name: string;
  label?: string;
  //group: "in" | "out";
}

export enum ReactionType {
  Start = "Start",
  End = "End",
  SingleReaction = "SingleReaction",
  ControllerReaction = "ControllerReaction",
  ControllerDefaultReaction = "ControllerDefaultReaction",
}

export interface IReactionNodeData {
  name?: string;
  componentName?: string;
  reactionName?: string;
  inPorts?: IPortMeta[];
  outPorts?: IPortMeta[];
}

export interface IConfigMeta {
  controllerId?: string;
  reactionRef?: string;//reaction id or name(default reaction)
}

export interface IReactionMeta<ConfigMeta extends IConfigMeta = IConfigMeta> extends IReactionNodeData {
  id: string;
  type: ReactionType;
  materialName: string;
  name?: string;
  label?: string;
  x6Node?: IX6NodeMeta;
  config?: ConfigMeta,
}

export interface IInvokeMeta {
  id: string;
  source: {
    nodeId: string;
    portId?: string;
  }
  target: {
    nodeId: string;
    portId?: string;
  };
  //x6Edge: IX6EdgeMeta;
}

export interface ILogicMetas {
  reactions: IReactionMeta<IConfigMeta>[];
  invokes: IInvokeMeta[];
}

export interface IReactionDefineMeta {
  id: string,
  name?: string,
  label?: string,
  //可视化场景使用
  logicMetas?: ILogicMetas,
  //不能可视化的场景使用，比如右侧属性面板
  jsCode?: string,
}

export interface IVariableDefineMeta {
  id: string,
  name: string,
  defaultValue?: any,
}

// $form 虚拟表单， 
// $field 当前字段, 设置字段：$field.setValue
// $self 组件，设置组件属性:$self.setProps({dataSource:[...]}), 
export interface IControllerMeta {
  id: string,
  enable?: boolean,
  name?: string,
  events?: IReactionDefineMeta[],
  reactions?: IReactionDefineMeta[],
  variables?: IVariableDefineMeta[],
  //js代码表述的表达式
  expressions?: {
    [propName: string]: string | undefined,
  }
}
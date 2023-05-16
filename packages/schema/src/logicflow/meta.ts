export interface IX6NodeDefine {
  /** 节点x坐标 */
  x: number;
  /** 节点y坐标  */
  y: number;
  /** 节点宽度 */
  width: number;
  /** 节点高度 */
  height: number;
}

export interface IPortDefine {
  id: string;
  name: string;
  label?: string;
  //group: "in" | "out";
}

export enum ActivityType {
  Start = 'Start',
  End = 'End',
  SingleActivity = 'SingleReaction',
  ControllerReaction = 'ControllerReaction',
  ControllerDefaultReaction = 'ControllerDefaultReaction'
}

export interface IReactionNodeData {
  name?: string;
  componentName?: string;//##@@
  reactionName?: string;
  inPorts?: IPortDefine[];
  outPorts?: IPortDefine[];
}

export interface IConfigMeta {
  controllerId?: string;
  reactionRef?: string; //reaction id or name(default reaction)
}

export interface IActivityDefine<ConfigMeta extends IConfigMeta = IConfigMeta>
  extends IReactionNodeData {
  id: string;
  type: ActivityType;
  materialName: string;
  //name?: string;
  label?: string;
  x6Node?: IX6NodeDefine;
  config?: ConfigMeta;
}

export interface IPortRefDefine{
  nodeId: string;
  portId?: string;
}

export interface ILineDefine {
  id: string;
  source: IPortRefDefine;
  target: IPortRefDefine;
}

export interface ILogicFlowDefinition {
  id: string;
  name?: string;
  label?: string;
  nodes: IActivityDefine<IConfigMeta>[];
  lines: ILineDefine[];
}

export interface IVariableDefineMeta {
  id: string;
  name: string;
  defaultValue?: unknown;
}

// $form 虚拟表单，
// $field 当前字段, 设置字段：$field.setValue
// $self 组件，设置组件属性:$self.setProps({dataSource:[...]}),
export interface IControllerMeta {
  id: string;
  enable?: boolean;
  name?: string;
  events?: ILogicFlowDefinition[];
  reactions?: ILogicFlowDefinition[];
  variables?: IVariableDefineMeta[];
  //js代码表述的表达式
  expressions?: {
    [propName: string]: string | undefined;
  };
}

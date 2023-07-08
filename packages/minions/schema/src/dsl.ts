export interface IPortDefine {
  id: string;
  name: string;
  label?: string;
}

export enum ActivityType {
  Start = 'Start',
  End = 'End',
  Activity = 'Activity',
  LogicFlowActivity = "LogicFlowActivity",
  //嵌入式子流程
  EmbeddedFlow = "EmbeddedFlow"
}

export interface ILogicFlowConfig {
  param?: {
    logicFlowId: string
  }
}

export interface IActivityDefine<ConfigMeta = unknown> {
  id: string;
  //name?: string;
  type: ActivityType;
  activityName: string;
  label?: string;
  config?: ConfigMeta;
  inPorts?: IPortDefine[];
  outPorts?: IPortDefine[];

  //父节点，嵌入子编排用
  parentId?: string;
}

export interface IPortRefDefine {
  nodeId: string;
  portId?: string;
}

export interface ILineDefine {
  id: string;
  source: IPortRefDefine;
  target: IPortRefDefine;
  //父节点，嵌入子编排用
  parentId?: string;
}

export interface ILogicFlowMetas {
  nodes: IActivityDefine<unknown>[];
  lines: ILineDefine[];
}

export interface ILogicFlowDefine extends ILogicFlowMetas {
  id: string;
  name?: string;
  label?: string;
}
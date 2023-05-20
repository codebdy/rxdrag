export interface IPortDefine {
  id: string;
  name: string;
  label?: string;
}

export enum ActivityType {
  Start = 'Start',
  End = 'End',
  Activity = 'Activity',
  LogicFlowActivity = "LogicFlowActivity"
}

export interface ILogicFlowConfig {
  logicFlowId: string
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
}

export interface IPortRefDefine {
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
  nodes: IActivityDefine<unknown>[];
  lines: ILineDefine[];
}
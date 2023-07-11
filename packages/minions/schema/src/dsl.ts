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
  //节点名称，一般用于开始结束、节点
  name?: string;
  type: ActivityType;
  activityName: string;
  label?: string;
  config?: ConfigMeta;
  inPorts?: IPortDefine[];
  outPorts?: IPortDefine[];

  //父节点，嵌入子编排用
  parentId?: string;

  // 子节点，嵌入编排用
  children?: ILogicFlowMetas
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

export interface ILogicFlowMetas {
  nodes: IActivityDefine<unknown>[];
  lines: ILineDefine[];
}

export interface ILogicFlowDefine extends ILogicFlowMetas {
  id: string;
  name?: string;
  label?: string;
}
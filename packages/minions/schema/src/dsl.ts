export interface IPortDefine<TypeDefine = unknown> {
  //唯一标识
  id: string;
  //端口名词
  name: string;
  //显示文本
  label?: string;
  //端口数据类型
  type?: TypeDefine;
}

export enum NodeType {
  //开始节点
  Start = 'Start',
  //结束节点
  End = 'End',
  //普通节点
  Activity = 'Activity',
  //子编排，对其它编排的引用
  LogicFlowActivity = "LogicFlowActivity",
  //嵌入式节点，比如自定义逻辑编排
  EmbeddedFlow = "EmbeddedFlow"
}

export interface ILogicFlowConfig {
  param?: {
    logicFlowId: string
  }
}

//一段逻辑编排数据
export interface ILogicFlowMetas {
  //所有节点
  nodes: INodeDefine<unknown>[];
  //所有连线
  lines: ILineDefine[];
}

export interface INodeDefine<ConfigMeta = unknown> {
  //唯一标识
  id: string;
  //节点名称，一般用于开始结束、节点，转换后对应子编排的端口
  name?: string;
  //节点类型
  type: NodeType;
  //活动名称，解析引擎用，通过该名称，查找构造节点的具体运行实现
  activityName: string;
  //显示文本
  label?: string;
  //子文本
  subLabel?: string;
  //节点配置
  config?: ConfigMeta;
  //输入端口
  inPorts?: IPortDefine[];
  //输出端口
  outPorts?: IPortDefine[];
  //父节点，嵌入子编排用
  parentId?: string;
  // 子节点，嵌入编排用
  children?: ILogicFlowMetas
}

//连线接头
export interface IPortRefDefine {
  //节点Id
  nodeId: string;
  //端口Id
  portId?: string;
}

//连线定义
export interface ILineDefine {
  //唯一标识
  id: string;
  //起点
  source: IPortRefDefine;
  //终点
  target: IPortRefDefine;
}

//逻辑编排
export interface ILogicFlowDefine {
  //唯一标识
  id: string;
  //名称
  name?: string;
  //显示文本
  label?: string;

  metas?: ILogicFlowMetas,

}

//脚本定义
export interface IScriptDefine {
  id: string,
  name?: string,
  code?: string,

}
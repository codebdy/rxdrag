import { ILogicFlowDefine } from "@rxdrag/minions-schema";

//控制器变量定义
export interface IVariableDefineMeta {
  //变量标识
  id: string;
  //变量名称
  name: string;
  //变量默认值
  defaultValue?: unknown;
}

//控制器元数据定义，相当于控制器配置的DSL
export interface IControllerMeta {
  //控制器标识
  id: string;
  //控制器类型，因为控制器可以注入很多种，类型不固定，这里不能用枚举，只能用字符串
  controllerType?: string;
  //是否全局，配置控制器的可见范围
  global?: boolean;
  //控制器名称
  name?: string;
  //属性表达式，尚未使用
  propExpressions?: {
    [prop: string]: string | undefined
  }
}

//逻辑编排控制器
export interface ILogicFlowControllerMeta extends IControllerMeta {
  //组件事件对应的逻辑编排，通过name与组件的事件建立联系
  events?: ILogicFlowDefine[];
  //控制器的交互，相当于子编排，可以被其他编排调用
  reactions?: ILogicFlowDefine[];
  //控制器的变量
  variables?: IVariableDefineMeta[];
  //需要配置，忘了哪里使用了
  props?: string[];
}

//脚本控制器
export interface IScriptControllerMeta extends IControllerMeta {
  //脚本代码
  script?: string
}

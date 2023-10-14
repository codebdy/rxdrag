//控制器变量定义
export interface IVariableDefineMeta {
  //变量标识
  id: string;
  //变量名称
  name: string;
  //变量默认值
  defaultValue?: unknown;
}

export interface IControllerMeta {
  //控制器标识
  id: string;
  //控制器名称
  name?: string;
  //是否启用，加这个的目的，是为了禁用再启用后，保证id不变
  enable?: boolean;
}
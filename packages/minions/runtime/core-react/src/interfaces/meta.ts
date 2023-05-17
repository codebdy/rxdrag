import { ILogicFlowDefinition } from "@rxdrag/minions";

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
}

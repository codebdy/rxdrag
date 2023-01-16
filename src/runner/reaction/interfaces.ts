import { IFunctionMeta } from "./metas"

export type Unsubscribe = () => void

export interface IHandlerArgs {
  inputValue?: any,
  outputs?: InputHandlers,
  context?: any
}

export type InputHandler = (args?: IHandlerArgs) => void

export type InputHandlers = {
  [name: string]: InputHandler
}

export interface IJointer {
  flowIn: InputHandler,
  addHandler: (handler: InputHandler) => void
  removeHandler: (handler: InputHandler) => void
}

export type OutputJointers = {
  [name: string]: IJointer | undefined
}

export interface ILogic {
  state: any,
  inputs: InputHandlers
  outputs?: InputHandlers
  getJointer?: (name: string) => IJointer | undefined
}

export interface IComponentController extends ILogic {
  effects: InputHandlers,
  events: InputHandlers,
}

export interface IEffects {
  onInit?: IFunctionMeta,
  onDestory?: IFunctionMeta,
  // onFormValueChange?: IFunctionMeta,
  // //JS代码
  // onFieldValueChange?: {
  //   field: string,
  //   func: IFunctionMeta
  // },
  // onMultiFieldValueChange?: {
  //   fields: string[],
  //   func: IFunctionMeta
  // }//...
}

export type MethodMetas = {
  [name: string]: IFunctionMeta | undefined
}
// $form 虚拟表单， 
// $field 当前字段, 设置字段：$field.setValue
// $self 组件，设置组件属性:$self.setProps({dataSource:[...]}), 
export interface IReactionsMeta {
  events?: {
    [key: string]: IFunctionMeta | undefined
  },
  methods: MethodMetas,
  variables?: string[],
}

export interface ILogicMeta {
  name?: string,
  outputEditable?: boolean,
  inputEditable?: boolean,
}
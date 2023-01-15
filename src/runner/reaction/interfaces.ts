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
  name: string,
  state: any,
  inputs: InputHandlers
  outputs?: InputHandlers
  getJointer?: (name: string) => IJointer | undefined
}


export enum ImplementType {
  Code = "Code",
  Visual = "Visual"
}

export interface IFunctionMeta {
  title?: string,
  name?: string,
  type?: ImplementType,
  jsCode?: string,
  metas?: any,
}

export interface IEffects {
  onInit?: IFunctionMeta,
  onFormValueChange?: IFunctionMeta,
  //JS代码
  onFieldValueChange?: {
    field: string,
    func: IFunctionMeta
  },
  onMultiFieldValueChange?: {
    fields: string[],
    func: IFunctionMeta
  }//...
}

export type MethodMetas = {
  [name: string]: IFunctionMeta | undefined
}
// $form 虚拟表单， 
// $field 当前字段, 设置字段：$field.setValue
// $self 组件，设置组件属性:$self.setProps({dataSource:[...]}), 
export interface IReactionsMeta {
  effects?: IEffects,
  events?: {
    [key: string]: IFunctionMeta | undefined
  },
  methods: MethodMetas
}

export interface ILogicMeta {
  name?: string,
  outputEditable?: boolean,
  inputEditable?: boolean,
}
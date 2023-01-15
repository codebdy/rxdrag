export type Unsubscribe = () => void

export interface IHandlerArgs {
  inputValue?: any,
  outputs?: IHandlers,
  context?: any
}

export interface IHandlers {
  [methodName: string]: (args?: IHandlerArgs) => void
}

export interface ILogic {
  name: string,
  state: any,
  inputs: IHandlers
  outputs: IHandlers
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

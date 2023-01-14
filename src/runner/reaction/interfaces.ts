
export interface IComponentController{

}

export interface IFunctionInputs {
  [name: string]: any
}

export type OutputHandler = () => void

export interface IFunctionOutputs {
  [name: string]: OutputHandler | undefined
}

export interface IFunctionArgs {
  inputValue: IFunctionInputs,
  outputs: IFunctionOutputs
}

export enum ImplementType {
  Code = "Code",
  Visual = "Visual"
}

export interface IFunction {
  title?: string,
  name?: string,
  type?: ImplementType,
  jsCode?: string,
  metas?: any,
}

export interface IEffects {
  onInit?: IFunction,
  onFormValueChange?: IFunction,
  //JS代码
  onFieldValueChange?: {
    field: string,
    func: IFunction
  },
  onMultiFieldValueChange?: {
    fields: string[],
    func: IFunction
  }//...
}


// $form 虚拟表单， 
// $field 当前字段, 设置字段：$field.setValue
// $self 组件，设置组件属性:$self.setProps({dataSource:[...]}), 
export interface IReactionsMeta {
  variables?: string[],
  effects?: IEffects,
  events?: {
    [key: string]: IFunction | undefined
  },
  functions: {
    [name: string]: IFunction | undefined
  }
}

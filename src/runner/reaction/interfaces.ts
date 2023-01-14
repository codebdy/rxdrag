
export interface IActionMeta<PayLoad = any> {
  uuid: string,
  title: string,
  type: string,
  payload?: PayLoad,
}

export interface IEffects {
  onInit?: string,
  onFormValueChange?: string,
  //JS代码
  onFieldValueChange?: {
    field: string,
    jsCode: string
  },
  onMultiFieldValueChange?: {
    fields: string[],
    jsCode: string
  }//...
}


// $form 虚拟表单， 
// $field 当前字段, 设置字段：$field.setValue
// $self 组件，设置组件属性:$self.setProps({dataSource:[...]}), 
export interface IReactionsMeta {
  variables?: string[],
  effects?: IEffects,
  events?: {
    [key: string]: IActionMeta
  },
  actions: {
    [name: string]: {
      args?: string[],
      jsCode?: string,
    }
  }
}

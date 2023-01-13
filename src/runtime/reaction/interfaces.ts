
export interface IRxAction<PayLoad=any> {
  uuid: string,
  title: string,
  actionType: string,
  payload?: PayLoad,
}

export interface IEffects{
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
  effects?: IEffects
}

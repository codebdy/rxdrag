export interface IX6PortMeta {
  id: string;
  group: "in" | "out";
}

export interface IX6NodeMeta {
  id: string;
  /** 节点x坐标 */
  x?: number;
  /** 节点y坐标  */
  y?: number;
  /** 节点宽度 */
  width?: number;
  /** 节点高度 */
  height?: number;
  ports?: IX6PortMeta[];
}

export interface IX6EdgeMeta {
  id: string;
  sourceAnchor: any;
  targetAnchor: any;
}

export interface IComponentMeta {

}

export interface ICallMeta {
  uuid: string;
  source: {
    functionUuid: string;
    outputId: string;
  }
  target: {
    functionUuid: string;
    inputId: string;
  };
}

export interface IPipesMeta {
  x6Nodes: IX6NodeMeta[]
  x6Edges: IX6EdgeMeta[]
}

export interface IFunctionMeta {
  uuid: string,
  title?: string,
  name?: string,
  metas?: IPipesMeta,
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
  uuid: string,
  events?: {
    [key: string]: IFunctionMeta | undefined
  },
  methods: MethodMetas,
  variables?: string[],
}
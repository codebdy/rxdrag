export type FieldType = 'object' | 'array' | 'normal' | 'fragment';

export interface IFieldMeta<Params = any> {
  //类型：对象、数组、常规、片段（name 为空）
  type?: FieldType;
  name?: string;
  label?: string;
  //validateRule?: any
  defaultValue?: any;
  fragmentFields?: IFieldMeta[];
  //校验规则
  validateRules?: any;
  params?: Params;
}

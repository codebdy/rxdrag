import { Action } from "redux"
import { FormActionPlayload } from "./actions"

export type Errors = {

}

export type Listener = () => void
export type ValueChangeListener = (value: any) => void
export type ErrorListener = (errors: Errors) => void
export type Unsubscribe = () => void

export interface IFormProps {
  value?: Object,	//表单值	Object	{}
  initialValue?: Object, 	//表单默认值	Object	{}
  pattern?: "editable" | "disabled" | "readOnly" | "readPretty", //	表单交互模式	
  display?: "visible" | "hidden" | "none", //表单显隐	
  hidden?: boolean, //	UI 隐藏	Boolean	true
  visible?: boolean, //	显示 / 隐藏(数据隐藏)	Boolean	true
  editable?: boolean, //	是否可编辑	Boolean	true
  disabled?: boolean, //	是否禁用	Boolean	false
  readOnly?: boolean, //	是否只读	Boolean	false
  readPretty?: boolean, //	是否是优雅阅读态	Boolean	false
  effects?: boolean, //	副作用逻辑，用于实现各种联动逻辑(form: Form)=> void
  validateFirst?: boolean, //	是否只校验第一个非法规则	Boolean
}

export type FieldType = "object" | "array" | "normal" | "fragment"

export interface IFieldMeta<Params = any> {
  //类型：对象、数组、常规、片段（name 为空）
  type?: FieldType
  name?: string
  label?: string
  //validateRule?: any
  defaultValue?: any
  fragmentFields?: IFieldMeta[]
  //校验规则
  validateRules?: any
  params?: Params,
}

//让path可以重复，避免fragment覆盖其他值
export interface IFieldSchema extends IFieldMeta {
  path: string
}

export interface IAction<Payload> extends Action<string> {
  payload?: Payload
}

export type FieldDisplayTypes = 'none' | 'hidden' | 'visible'
export type FieldPatternTypes = 'editable' | 'disabled' | 'readOnly' | 'readPretty'
export type FieldValidateStatus = 'error' | 'warning' | 'success' | 'validating'
export interface IFieldFeedback {
  path?: string
  name?: string
  triggerType?: 'onInput' | 'onFocus' | 'onBlur' //Verify the trigger type
  type?: 'error' | 'success' | 'warning' //feedback type
  code?: //Feedback code
  | 'ValidateError'
  | 'ValidateSuccess'
  | 'ValidateWarning'

  messages?: string[] //Feedback message
}

export type FieldChangeListener = (field: FieldState | undefined) => void
export type FieldValueChangeListener = (value: any, previousValue: any) => void
export type FieldValuesChangeListener = (values: any[], previousValues: any[]) => void
export type FormChangeListener = (form: FormState) => void
export type FormValueChangeListener = (value: FormValue) => void

export type FieldState = {
  //自动生成id，用于组件key值
  id: string;
  name?: string;
  basePath?: string;
  path: string;
  initialized?: boolean;//字段是否已被初始化
  mounted?: boolean; //字段是否已挂载
  unmounted?: boolean; //字段是否已卸载
  active?: boolean; //触发 onFocus 为 true，触发 onBlur 为 false
  visited?: boolean; //触发过 onFocus 则永远为 true
  display?: FieldDisplayTypes;
  pattern?: FieldPatternTypes;
  loading?: boolean;
  validating?: boolean;
  modified?: boolean;
  required?: boolean;
  value?: any;
  defaultValue?: any;
  initialValue?: any;
  errors?: IFieldFeedback[];
  validateStatus?: FieldValidateStatus;
  meta: IFieldMeta
}

export type FieldsState = {
  [path: string]: FieldState | undefined
}

export type FormState = {
  mounted?: boolean; //字段是否已挂载
  unmounted?: boolean; //字段是否已卸载
  initialized?: boolean;
  //display?: FieldDisplayTypes;
  pattern?: FieldPatternTypes;
  loading?: boolean;
  validating?: boolean;
  modified?: boolean;
  fields: FieldsState;
  fieldSchemas: IFieldSchema[];
  initialValue?: any;
  value?: any;
}

export interface FormValue {
  [key: string]: any
}

export interface IFormNode {
  initialValue?: any
  value?: any
  setValue(value: any): void
  setInitialValue(value: any): void
  inpuValue(value: any): void
  validate(): void

  onInit(listener: Listener): Unsubscribe
  onMount(listener: Listener): Unsubscribe
  onUnmount(listener: Listener): Unsubscribe
  onValueChange(listener: ValueChangeListener): Unsubscribe
  onInitialValueChange(): Unsubscribe
  onValidateStart(listener: Listener): Unsubscribe
  onValidateEnd(listener: Listener): Unsubscribe
  onValidateFailed(listener: ErrorListener): Unsubscribe
  onValidateSuccess(listener: Listener): Unsubscribe
}

export interface IForm extends IFormNode {
  name: string
  getField(path: string): IField | undefined
  registerField(fieldSchema: IFieldSchema): IField
  unregisterField(path: string): void

  getFieldState(fieldPath: string): FieldState | undefined
}

export interface IField extends IFormNode {
  //引用数量
  refCount: number;
  meta?: IFieldMeta
  basePath?: string
  path: string
  destory(): void
}

export interface IFieldyEngine {
  //getField(formName: string, path: string): IField | undefined
  //动作
  createForm(options?: IFormProps): IForm
  removeForm(name: string): void
  //setFormFieldMetas(name: string, fieldMetas: IFieldSchema[]): void
  //不触发change事件
  setFormInitialValue(name: string, value: FormValue): void
  setFormValue(name: string, value: FormValue): void
  setFormFlatValue(name: string, flatValues: FormValue): void
  addFields(name: string, ...fieldSchemas: IFieldSchema[]): void
  removeFields(formName: string, ...fieldPaths: string[]): void

  //field动作
  setFieldIntialValue(formName: string, fieldPath: string, value: any): void
  setFieldValue(formName: string, fieldPath: string, value: any): void
  setFieldFragmentValue(formName: string, fieldPath: string, value: any): void
  inputFieldValue(formName: string, fieldPath: string, value: any): void

  //监测
  getForm(name: string): IForm | undefined
  getFormState(name: string): FormState | undefined
  getFieldState(formName: string, fieldPath: string): FieldState | undefined
  getFieldValue(formName: string, fieldPath: string): any
  getFormValue(formName: string): FormValue
  getFormFlatValues(formName: string): FormValue
  subscribeToFormChange(name: string, listener: FormChangeListener): Unsubscribe
  subscribeToFormValuesChange(name: string, listener: FormValueChangeListener): Unsubscribe
  subscribeToFieldChange(formName: string, path: string, listener: FieldChangeListener): Unsubscribe
  subscribeToFieldValueChange(formName: string, fieldPath: string, listener: FieldValueChangeListener): Unsubscribe
  subscribeToMultiFieldValueChange(formName: string, fieldPaths: string[], listener: FieldValuesChangeListener): Unsubscribe
  subscribeToFormInitialized(formName: string, listener: Listener): Unsubscribe

  dispatch(action: IAction<FormActionPlayload>): void
}

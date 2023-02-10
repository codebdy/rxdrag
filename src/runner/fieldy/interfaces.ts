import { Action } from "redux"
import { FormActionPlayload } from "./actions"

export type Listener = () => void
export type Unsubscribe = () => void

export interface IFormProps {
  values?: Object,	//表单值	Object	{}
  initialValues?: Object, 	//表单默认值	Object	{}
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

export interface IFieldMeta<Params = any> {
  //类型：对象、数组、常规、片段（name 为空）
  type?: "object" | "array" | "normal" | "fragment"
  name?: string
  //validateRule?: any
  defaultValue?: any
  //是否虚拟字段，如果是，不输出最终值，不触发change， 该字段要废除
  virtual?: boolean
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
export type FormValuesChangeListener = (values: FormValue, flatValues: FormValue) => void

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
  display?: FieldDisplayTypes;
  pattern?: FieldPatternTypes;
  loading?: boolean;
  validating?: boolean;
  modified?: boolean;
  fields: FieldsState;
  fieldSchemas: IFieldSchema[];
  originalValue?: any;
}

export interface FormValue {
  [key: string]: any
}

//这段代码备用
export interface IForm {
  onFormInit(): void
  onFormMount(): void
  onFormUnmount(): void
  onFormReact(): void
  onFormValuesChange(): void
  onFormInitialValuesChange(): void
  onFormInputChange(): void
  onFormSubmit(): void
  onFormSubmitStart(): void
  onFormSubmitEnd(): void
  onFormSubmitFailed(): void
  onFormSubmitSuccess(): void
  onFormSubmitValidateStart(): void
  onFormSubmitValidateEnd(): void
  onFormSubmitValidateFailed(): void
  onFormSubmitValidateSuccess(): void
  onFormValidateStart(): void
  onFormValidateEnd(): void
  onFormValidateFailed(): void
  onFormValidateSuccess(): void
}

export interface IFieldyEngine {
  //动作
  createForm(options?: IFormProps): string
  removeForm(name: string): void
  setFormFieldMetas(name: string, fieldMetas: IFieldSchema[]): void
  //不触发change事件
  setFormInitialValue(name: string, value: FormValue): void
  setFormValues(name: string, value: FormValue): void
  setFormFlatValues(name: string, flatValues: FormValue): void
  addFieldMetas(name: string, ...fieldMetas: IFieldSchema[]): void
  removeFieldMetas(formName: string, ...fieldPaths: string[]): void

  //field动作
  setFieldValue(formName: string, fieldPath: string, value: any): void
  setFieldFragmentValue(formName: string, fieldPath: string, value: any): void

  //监测
  getForm(name: string): FormState | undefined
  getField(formName: string, fieldPath: string): FieldState | undefined
  getFieldValue(formName: string, fieldPath: string): any
  getFormValues(formName: string): FormValue
  getFormFlatValues(formName: string): FormValue
  subscribeToFormChange(name: string, listener: FormChangeListener): Unsubscribe
  subscribeToFormValuesChange(name: string, listener: FormValuesChangeListener): Unsubscribe
  subscribeToFieldChange(formName: string, path: string, listener: FieldChangeListener): Unsubscribe
  subscribeToFieldValueChange(formName: string, fieldPath: string, listener: FieldValueChangeListener): Unsubscribe
  subscribeToMultiFieldValueChange(formName: string, fieldPaths: string[], listener: FieldValuesChangeListener): Unsubscribe
  subscribeToFormInitialized(formName: string, listener: Listener): Unsubscribe

  dispatch(action: IAction<FormActionPlayload>): void
}

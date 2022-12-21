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

//跟core模块重复的定义，可能会在不同的项目中，暂时允许重复
export interface IFieldMeta {
  type?: "object" | "array" | "normal"
  name: string
  validateRule?: any
  defaultValue?: any,
  //触发验证
  trigger?: string | string[],
  //校验规则
  rules?: { [key: string]: boolean | string }[]
  //是否接管输入输出控制，normal 类型默认true，其它默认 false
  controllValue?: boolean
}

export interface IFieldSchema extends IFieldMeta {
  fields: IFieldSchema[]
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

export type FieldChangeListener = (field: FieldState) => void
export type FormChangeListener = (form: FormState) => void
export type FormValuesChangeListener = (values: FormValue, flatValues: FormValue) => void

export type FieldState = {
  //自动生成id，用于组件key值
  id: string;
  name: string;
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
  fieldSchema: IFieldSchema
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
  setFormSchema(name: string, fieldSchemas: IFieldSchema[]): void
  //不触发change事件
  setFormInitialValue(name: string, value: FormValue): void
  setFormValues(name: string, value: FormValue): void
  setFormFlatValues(name: string, flatValues: FormValue): void
  setSubFields(formName: string, fieldPath: string, subFieldSchemas: IFieldSchema[]): void
  addSubFields(formName: string, fieldPath: string, subFieldSchemas: IFieldSchema[]): void
  removeSubFields(formName: string, fieldPath: string, ...subFieldNames: string[]): void

  //field动作
  setFieldValue(formName: string, fieldPath: string, value: any): void

  //监测
  getForm(name: string): FormState | undefined
  getField(formName: string, fieldPath: string): FieldState | undefined
  getFormValues(formName: string): FormValue
  getFormFlatValues(formName: string): FormValue
  subscribeToFormChange(name: string, listener: FormChangeListener): Unsubscribe
  subscribeToFormValuesChange(name: string, listener: FormValuesChangeListener): Unsubscribe
  subscribeToFieldChange(formName: string, path: string, listener: FieldChangeListener): Unsubscribe
  subscribeToFormInitialized(formName: string, listener: Listener): Unsubscribe

  dispatch(action: IAction<FormActionPlayload>): void
}

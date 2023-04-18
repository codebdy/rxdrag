import { Action } from "redux"
import { FormActionPlayload } from "./actions"
import { DisplayType, IFieldMeta, PatternType } from "@rxdrag/schema"

export type Errors = {
  message?: string
}

export type Listener = () => void
export type ValueChangeListener = (value: unknown) => void
export type ErrorListener = (errors: Errors) => void
export type Unsubscribe = () => void

export interface IFormProps {
  value?: object,	//表单值	Object	{}
  initialValue?: object, 	//表单默认值	Object	{}
  pattern?: PatternType, //	表单交互模式	
  display?: DisplayType, //表单显隐	
  hidden?: boolean, //	UI 隐藏	Boolean	true
  visible?: boolean, //	显示 / 隐藏(数据隐藏)	Boolean	true
  editable?: boolean, //	是否可编辑	Boolean	true
  disabled?: boolean, //	是否禁用	Boolean	false
  readOnly?: boolean, //	是否只读	Boolean	false
  readPretty?: boolean, //	是否是优雅阅读态	Boolean	false
  effects?: boolean, //	副作用逻辑，用于实现各种联动逻辑(form: Form)=> void
  validateFirst?: boolean, //	是否只校验第一个非法规则	Boolean
}


//让path可以重复，避免fragment覆盖其他值
export interface IFieldSchema extends IFieldMeta {
  path: string
}

export interface IAction<Payload> extends Action<string> {
  payload?: Payload
}


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
export type FieldValueChangeListener = (value: unknown, previousValue: unknown) => void
export type FieldValuesChangeListener = (values: unknown[], previousValues: unknown[]) => void
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
  display?: DisplayType;
  pattern?: PatternType;
  loading?: boolean;
  validating?: boolean;
  modified?: boolean;
  required?: boolean;
  value?: unknown;
  defaultValue?: unknown;
  initialValue?: unknown;
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
  display?: DisplayType;
  pattern?: PatternType;
  loading?: boolean;
  validating?: boolean;
  modified?: boolean;
  fields: FieldsState;
  fieldSchemas: IFieldSchema[];
  initialValue?: unknown;
  value?: unknown;
}

export interface FormValue {
  [key: string]: unknown
}

export interface IFormNode {
  fieldy: IFieldyEngine
  initialValue?: unknown
  value?: unknown
  setValue(value: unknown): void
  setInitialValue(value: unknown): void
  inpuValue(value: unknown): void
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
  form: IForm
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
  setFieldIntialValue(formName: string, fieldPath: string, value: unknown): void
  setFieldValue(formName: string, fieldPath: string, value: unknown): void
  setFieldFragmentValue(formName: string, fieldPath: string, value: unknown): void
  inputFieldValue(formName: string, fieldPath: string, value: unknown): void

  //监测
  getForm(name: string): IForm | undefined
  getFormState(name: string): FormState | undefined
  getFieldState(formName: string, fieldPath: string): FieldState | undefined
  getFieldValue(formName: string, fieldPath: string): unknown
  getFormValue(formName: string): FormValue
  getFormFlatValues(formName: string): FormValue
  subscribeToFormChange(name: string, listener: FormChangeListener): Unsubscribe
  subscribeToFormValuesChange(name: string, listener: FormValueChangeListener): Unsubscribe
  subscribeToFieldChange(formName: string, path: string, listener: FieldChangeListener): Unsubscribe
  subscribeToFieldValueChange(formName: string, fieldPath: string, listener: FieldValueChangeListener): Unsubscribe
  subscribeToMultiFieldValueChange(formName: string, fieldPaths: string[], listener: FieldValuesChangeListener): Unsubscribe
  subscribeToFormInitialized(formName: string, listener: FormChangeListener): Unsubscribe

  dispatch(action: IAction<FormActionPlayload>): void
}

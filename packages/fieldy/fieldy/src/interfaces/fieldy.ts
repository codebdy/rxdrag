import { Action } from "redux"
import { FormActionPayload, IFieldFeedback } from "../actions"
import { IFieldMeta, IValidateSchema } from "./meta"
import { IValidationError, IValidator } from "./validator"

export type Errors = {
  message?: string
}

export type Listener = () => void
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValueChangeListener = (value: any) => void
export type ErrorListener = (errors: IValidationError[]) => void
export type SuccessListener = (value: unknown) => void
export type Unsubscribe = () => void
export type ExpContextChangeListener = (expContext?: Record<string, unknown>) => void

export interface IFormProps {
  name?: string,
  value?: object,	//表单值	Object	{}
  initialValue?: object, 	//表单默认值	Object	{}
  validateFirst?: boolean, //	是否只校验第一个非法规则	Boolean
}


//让path可以重复，避免fragment覆盖其他值
export interface IFieldSchema<ValidateRules extends IValidateSchema = IValidateSchema> extends IFieldMeta<ValidateRules> {
  path: string
}

export interface IAction<Payload> extends Action<string> {
  payload?: Payload
}

export type FieldChangeListener = (field: FieldState | undefined) => void
export type FieldValueChangeListener = (value: unknown, previousValue: unknown) => void
export type FieldValuesChangeListener = (values: unknown[], previousValues: unknown[]) => void
export type FormChangeListener = (form: FormState) => void
export type FormValueChangeListener = (value: FormValue | undefined) => void

export type FieldState = {
  //自动生成id，用于组件key值
  id: string;
  //数组行数据是数字
  name?: string | number | null;
  basePath?: string;
  path: string;
  initialized?: boolean;//字段是否已被初始化
  mounted?: boolean; //字段是否已挂载
  unmounted?: boolean; //字段是否已卸载
  active?: boolean; //触发 onFocus 为 true，触发 onBlur 为 false
  visited?: boolean; //触发过 onFocus 则永远为 true
  loading?: boolean;
  validating?: boolean;
  modified?: boolean;
  required?: boolean;
  //value?: unknown;
  //defaultValue?: unknown;
  //initialValue?: unknown;
  errors?: string[];
  //validateStatus?: FieldValidateStatus;
  meta: IFieldMeta
}

export type FieldsState = {
  [path: string]: FieldState | undefined
}

export type FormState = {
  mounted?: boolean; //是否已挂载
  unmounted?: boolean; //是否已卸载
  initialized?: boolean;
  loading?: boolean;
  validating?: boolean;
  modified?: boolean;
  fields: FieldsState;
  fieldSchemas: IFieldSchema[];
  //初始值
  initialValue?: FormValue | undefined;
  //默认值，默认值各字段自己管理
  //defaultValue?: FormValue | undefined;
  //当前值
  value?: FormValue | undefined;
}

export interface FormValue {
  [key: string]: unknown
}

export enum ValidateStatus {
  error = "error",
  success = "success"
}

export interface ValidateResult {
  status: ValidateStatus,
  errors?: IValidationError[],
  value?: FormValue | unknown,
  message?: string,
}

export interface IValidationSubscriber {
  onValidateStart(listener: Listener): Unsubscribe
  onValidateEnd(listener: Listener): Unsubscribe
  onValidateFailed(listener: ErrorListener): Unsubscribe
  onValidateSuccess(listener: SuccessListener): Unsubscribe
}

export interface IFormNode<T> extends IValidationSubscriber {
  fieldy: IFieldyEngine
  getModified(): boolean
  //getDefaultValue(): T
  getInitialValue(): T
  getValue(): T
  setValue(value: T): void
  setInitialValue(value: T): void
  //setDefaultValue(value: T): void
  // mount(): void
  // unmount(): void
  validate(): Promise<ValidateResult>
  reset(): void

  onInit(listener: Listener): Unsubscribe
  onMount(listener: Listener): Unsubscribe
  onUnmount(listener: Listener): Unsubscribe
  onValueChange(listener: ValueChangeListener): Unsubscribe
  onInitialValueChange(): Unsubscribe

}

export interface IForm<ValidateRules extends IValidateSchema = IValidateSchema> extends IFormNode<FormValue | undefined> {
  name: string
  getField(path: string): IField<ValidateRules> | undefined
  queryField(pathExp: string): IField<ValidateRules> | undefined
  registerField(fieldSchema: IFieldSchema<ValidateRules>): IField
  unregisterField(path: string): void

  getFieldState(fieldPath: string): FieldState | undefined

  getFieldSchemas(): IFieldSchema<ValidateRules>[]
  getRootFieldSchemas(): IFieldSchema<ValidateRules>[]
  getRootFields(): IField<ValidateRules>[]

  getExpContext(): Record<string, unknown> | undefined
  setExpContext(expContext?: Record<string, unknown> | undefined): void

  onExpContextChange(listener: ExpContextChangeListener): Unsubscribe
}

export interface IField<ValidateRules extends IValidateSchema = IValidateSchema> extends IFormNode<unknown> {
  form: IForm
  //引用数量
  refCount: number;
  meta?: IFieldMeta
  basePath?: string
  path: string
  inputValue(value: unknown): void
  getDefaultValue(): unknown
  getFieldSchema(): IFieldSchema<ValidateRules>
  getSubFieldSchemas(): IFieldSchema<ValidateRules>[] | undefined
  getSubFields(): IField<ValidateRules>[] | undefined
  getState(): FieldState | undefined
  getSiblings(): IField[]
  getParent(): IField | undefined
  clearErrors(): void
  destroy(): void
}

export interface IFieldyEngine {
  validator: IValidator | undefined
  //getField(formName: string, path: string): IField | undefined
  //动作
  createForm(options?: IFormProps): IForm
  removeForm(name: string): void
  resetForm(name: string): void
  //setFormFieldMetas(name: string, fieldMetas: IFieldSchema[]): void
  //不触发change事件
  setFormInitialValue(name: string, value: FormValue | undefined): void
  //setFormDefaultValue(name: string, value: FormValue | undefined): void
  setFormValue(name: string, value: FormValue | undefined): void
  //setFormFlatValue(name: string, flatValues: FormValue): void
  addFields(name: string, ...fieldSchemas: IFieldSchema[]): void
  removeField(formName: string, fieldPath: string): void
  setValidationFeedbacks(name: string, feedbacks: IFieldFeedback[]): void

  //field动作
  setFieldInitialValue(formName: string, fieldPath: string, value: unknown): void
  setFieldDefaultValue(formName: string, fieldPath: string, value: unknown): void
  setFieldValue(formName: string, fieldPath: string, value: unknown): void
  inputFieldValue(formName: string, fieldPath: string, value: unknown): void
  setFieldState(formName: string, fieldState: FieldState): void
  clearFieldErrors(formName: string, fieldPath: string): void

  //监测
  getForm(name: string): IForm | undefined
  getFormState(name: string): FormState | undefined
  getFieldState(formName: string, fieldPath: string): FieldState | undefined
  getFieldValue(formName: string, fieldPath: string): unknown
  getFieldInitialValue(formName: string, fieldPath: string): unknown
  getFieldDefaultValue(formName: string, fieldPath: string): unknown
  getFormValue(formName: string): FormValue | undefined
  getFormInitialValue(formName: string): FormValue | undefined
  // getFormDefaultValue(formName: string): FormValue | undefined
  subscribeToFormChange(name: string, listener: FormChangeListener): Unsubscribe
  subscribeToFormValuesChange(name: string, listener: FormValueChangeListener): Unsubscribe
  subscribeToFieldChange(formName: string, path: string, listener: FieldChangeListener): Unsubscribe
  subscribeToFieldValueChange(formName: string, fieldPath: string, listener: FieldValueChangeListener): Unsubscribe
  subscribeToFormInitialized(formName: string, listener: FormChangeListener): Unsubscribe

  dispatch(action: IAction<FormActionPayload>): void
}

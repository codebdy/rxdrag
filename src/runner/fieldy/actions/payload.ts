import {  FormValue, IFieldSchema } from "runner/fieldy/interfaces"
export interface FormActionPlayload {
  formName: string,
  [key: string]: any,
}

export interface FieldActionPayload extends FormActionPlayload {
  path: string
}

export interface SetFormFieldsPayload extends FormActionPlayload {
  fieldSchemas: IFieldSchema[]
}

export interface RemoveFormFieldsPayload extends FormActionPlayload {
  paths: string[]
}

export interface SetFormValuePayload extends FormActionPlayload {
  value: FormValue
}

export interface SetFormInitializedFlagPayload extends FormActionPlayload {
  initialized: boolean
}

export interface SetFieldValuePayload extends FieldActionPayload {
  value?: any
}

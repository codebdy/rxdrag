import { FormActionPlayload, FormValue, IFieldSchema } from "fieldy/interfaces"

export interface SetFormFieldsPayload extends FormActionPlayload {
  fieldSchemas: IFieldSchema[]
}


export interface SetFormValuesPayload extends FormActionPlayload {
  values: FormValue
}

export interface SetFormInitializedFlagPayload extends FormActionPlayload {
  initialized: boolean
}


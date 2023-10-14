import { FieldState, FormValue, IFieldSchema } from "../interfaces/fieldy"

export interface IFieldFeedback {
  path: string
  type: 'error' | 'success'  //feedback type
  messages?: string[] //Feedback message
}

export interface FormActionPayload {
  formName: string,
  [key: string]: unknown,
}

export interface FieldActionPayload extends FormActionPayload {
  path: string
}

export interface SetFormFieldsPayload extends FormActionPayload {
  fieldSchemas: IFieldSchema[]
}

export interface RemoveFormFieldPayload extends FormActionPayload {
  path: string
}

export interface SetFormValuePayload extends FormActionPayload {
  value: FormValue
}

export interface SetFormFeedbacksPayload extends FormActionPayload {
  feedbacks: IFieldFeedback[]
}

export interface SetFormInitializedFlagPayload extends FormActionPayload {
  initialized: boolean
}

export interface SetFieldValuePayload extends FieldActionPayload {
  value?: unknown
}

export interface SetFieldStatePayload extends FieldActionPayload {
  fieldState: FieldState
}

// export interface SetFeildErrorsPayload  extends FieldActionPayload {
//   errors: IValidationError[]
// }


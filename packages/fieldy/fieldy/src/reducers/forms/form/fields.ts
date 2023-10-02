/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
import { isStr } from "@rxdrag/shared";
import { SET_FORM_FIELDS, SetFormFieldsPayload, ADD_FORM_FIELDS, REMOVE_FORM_FIELDS, RemoveFormFieldsPayload, FieldActionPayload, SetFieldValuePayload, SET_FORM_INITIAL_VALUE, SET_FORM_FIELDS_FEEDBACKS, SetFormFeedbacksPayload } from "../../../actions";
import { FieldsState, IAction, IFieldSchema } from "../../../interfaces/fieldy";
import { fieldReduce } from "./field";
import { DisplayType, Expression, PatternType } from "../../../interfaces";

let idSeed = 1
function makeId() {
  idSeed = idSeed + 1
  return "field-" + idSeed
}

export function fieldsReduer(state: FieldsState, action: IAction<unknown>): FieldsState {
  const setFieldValuePayload = action.payload as SetFieldValuePayload
  const field = state[setFieldValuePayload.path];
  switch (action.type) {
    //暂时没有用
    case SET_FORM_FIELDS:
      const fields = makeFields((action.payload as SetFormFieldsPayload).fieldSchemas)
      return fields || {}
    case ADD_FORM_FIELDS:
      const newFields = makeFields((action.payload as SetFormFieldsPayload).fieldSchemas)
      return { ...state, ...newFields }
    case REMOVE_FORM_FIELDS:
      const removeFieldValuePayload = action.payload as RemoveFormFieldsPayload
      const leftFields = {} as FieldsState
      for (const key of Object.keys(state)) {
        if (!removeFieldValuePayload.paths?.find(path => path === key)) {
          leftFields[key] = state[key]
        }
      }
      return leftFields
    case SET_FORM_INITIAL_VALUE:
      if (field) {
        return { ...state, [setFieldValuePayload.path]: { ...field, initialized: true } }
      }
      return state;
    case SET_FORM_FIELDS_FEEDBACKS:
      const feedbacksPayload = action.payload as SetFormFeedbacksPayload
      if (feedbacksPayload.feedbacks.length > 0) {
        const newState = { ...state }
        for (const feedback of feedbacksPayload.feedbacks) {
          const path = feedback.path
          const oldField = state[path]
          if (oldField) {
            newState[path] = { ...oldField, errors: feedback.type === "error" ? feedback.messages : undefined }
          } else {
            console.error("No field on path:", path)
          }
        }
        return newState
      }

      return state;
  }

  const payload = action.payload as FieldActionPayload
  const newState = state

  if (payload.path) {
    const filedState = newState[payload.path]
    if (filedState) {
      const fieldState = fieldReduce(filedState, action as IAction<FieldActionPayload>)
      return { ...newState, [payload.path]: fieldState }
    }
  }
  return newState
}

function makeFields(fieldSchemas: IFieldSchema[]) {
  const flatFields: FieldsState = {}
  for (const schema of fieldSchemas) {
    //没有name的一般都是辅助项目
    if (schema.name) {
      flatFields[schema.path] = {
        ...flatFields[schema.path],
        id: makeId(),
        ...schema,
        basePath: schema.path.substring(0, schema.path.length - (schema.name?.toString().length || 0) - 1),
        mounted: true,
        meta: schema,
        display: extractValue(schema?.reactionMeta?.display) as DisplayType | undefined,
        pattern: extractValue(schema?.reactionMeta?.pattern) as PatternType | undefined,
        hidden: extractValue(schema?.reactionMeta?.hidden) as boolean | undefined,
        disabled: extractValue(schema?.reactionMeta?.disabled) as boolean | undefined,
        readonly: extractValue(schema?.reactionMeta?.readonly) as boolean | undefined,
      }
    }

    return flatFields
  }

  type ExpressionObj = {
    value?: unknown,
    expression?: string,
  }

  function extractValue(expOrValue?: {
    value?: unknown,
    expression?: string,
  } | Expression) {
    if (isStr(expOrValue)) {
      if (expOrValue.trim().startsWith("{{")) {
        return undefined
      }
      return expOrValue;
    }
    if (expOrValue?.expression) {
      return expOrValue.value
    }
    const keys = Object.keys(expOrValue || {})
    if (keys.find((key) => key === "value") || keys.find((key) => key === "expression")) {
      (expOrValue as ExpressionObj)?.value
    }
    return keys.length == 0 ? undefined : expOrValue
  }
}

import { SET_FORM_FIELDS, SetFormFieldsPayload, SET_FORM_FLAT_VALUES, SetFormValuesPayload, SET_FORM_INITIAL_VALUES, SET_FORM_VALUES, SET_MULTI_FIELD_VALUES, SET_FORM_INITIALZED_FLAG, SetFormInitializedFlagPayload, FieldActionPayload, SET_FIELD_VALUE } from "runtime/fieldy/actions";
import { FieldsState, FormState, FormValue, IAction, IFieldSchema } from "runtime/fieldy/interfaces";
import { fieldReduce } from "./field";
var idSeed = 1
function makeId() {
  idSeed = idSeed + 1
  return "field-" + idSeed
}

export function formReduce(state: FormState, action: IAction<any>): FormState | undefined {
  switch (action.type) {
    case SET_FORM_FIELDS:
      const fields = patFlatFieldSchema((action.payload as SetFormFieldsPayload).fieldSchemas)
      return {
        ...state,
        fields,
        fieldSchemas: (action.payload as SetFormFieldsPayload).fieldSchemas,
        mounted: true,
      }
    case SET_FORM_FLAT_VALUES: {
      return setFlatValues(state, (action.payload as SetFormValuesPayload).values)
    }
    case SET_FORM_INITIAL_VALUES: {
      const flatInitialValues = patFlatValues((action.payload as SetFormValuesPayload).values, state.fieldSchemas)
      const stateWithInitialValues = setInitialFlatValues(state, flatInitialValues)
      return {
        ...state,
        ...stateWithInitialValues,
        originalValue: (action.payload as SetFormValuesPayload).values,
        initialized: true,
      }
    }
    case SET_FORM_VALUES: {
      const flatValues = patFlatValues((action.payload as SetFormValuesPayload).values, state.fieldSchemas)
      const stateWithFlateValues = setFlatValues(state, flatValues)

      return {
        ...state,
        ...stateWithFlateValues,
        originalValue: (action.payload as SetFormValuesPayload).values,
      }
    }

    case SET_MULTI_FIELD_VALUES: {
      return setFlatValues(state, (action.payload as SetFormValuesPayload).values)
    }

    case SET_FORM_INITIALZED_FLAG: {
      return {
        ...state,
        initialized: (action.payload as SetFormInitializedFlagPayload).initialized
      }
    }
  }

  const payload = action.payload as FieldActionPayload
  let newState = state
  if (action.type === SET_FIELD_VALUE) {
    newState = { ...state, modified: true }
  }
  if (payload.path) {
    const filedState = newState.fields[payload.path]
    if (filedState) {
      const fieldState = fieldReduce(filedState, action)
      return { ...newState, fields: { ...newState.fields, [payload.path]: fieldState } }
    }
  }
  return newState
}

function setInitialFlatValues(state: FormState, flatValues: any = {}) {
  const newFields = {} as FieldsState
  for (const key of Object.keys(state?.fields || {})) {
    const fieldState = state?.fields?.[key]
    if (fieldState) {
      newFields[key] = {
        ...fieldState,
        initialValue: flatValues[key],
        value: flatValues[key]
      }
    }

  }
  return state && {
    ...state,
    fields: { ...state.fields, ...newFields }
  }
}
function setFlatValues(state: FormState, flatValues: any = {}) {
  const newFields = {} as FieldsState
  for (const key of Object.keys(flatValues || {})) {
    const fieldState = state?.fields?.[key]
    if (fieldState) {
      newFields[key] = {
        ...fieldState,
        value: flatValues[key]
      } as any
    }
  }
  return state && {
    ...state,
    fields: Object.assign({}, state.fields, newFields),
    modified: true,
  }
}

function patFlatValues(values: FormValue | undefined, fieldSchemas: IFieldSchema[], parentFieldPath?: string) {
  const prefix = parentFieldPath ? parentFieldPath + "." : ""
  let flatValues: FormValue = {}
  for (const fieldSchema of fieldSchemas) {
    const { fields, ...meta } = fieldSchema
    if (!fieldSchema.name) {
      continue
    }
    if (Object.keys(fields).length > 0 && meta.type !== "object") {
      console.error("Not object type field has sub field")
    }
    const path = prefix + fieldSchema.name

    flatValues[path] = values?.[fieldSchema.name]
    if (fieldSchema.fields.length) {
      const subValues = patFlatValues(values?.[fieldSchema.name], fieldSchema.fields, path)
      flatValues = { ...flatValues, ...subValues }
    }
  }

  return flatValues
}

function patFlatFieldSchema(fieldSchemas: IFieldSchema[], parentFieldPath?: string) {
  const prefix = parentFieldPath ? parentFieldPath + "." : ""
  let flatFields: FieldsState = {}
  for (const fieldSchema of fieldSchemas || []) {
    const { fields, ...meta } = fieldSchema
    if (fieldSchema.type === "fragment") {
      const subFields = patFlatFieldSchema(fieldSchema.fragmentFields || [], parentFieldPath)
      flatFields = { ...flatFields, ...subFields }
      continue
    }
    if (fields && Object.keys(fields).length > 0 && meta.type !== "object") {
      console.error("Not object type field has sub field")
    }
    const path = prefix + fieldSchema.name
    flatFields[path] = {
      id: makeId(),
      ...meta,
      path: path,
      basePath: parentFieldPath,
      mounted: true,
      fieldSchema
    }
    const subFields = patFlatFieldSchema(fieldSchema.fields, path)
    flatFields = { ...flatFields, ...subFields }
  }

  return flatFields
}

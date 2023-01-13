
import { SET_FORM_FIELDS, SetFormFieldsPayload, SET_FORM_FLAT_VALUES, SetFormValuesPayload, SET_FORM_INITIAL_VALUES, SET_FORM_VALUES, SET_MULTI_FIELD_VALUES, SET_FORM_INITIALZED_FLAG, SetFormInitializedFlagPayload, FieldActionPayload, SET_FIELD_VALUE } from "runner/fieldy/actions";
import { getChildFields } from "runner/fieldy/funcs/path";
import { FieldsState, FormState, FormValue, IAction, IFieldMetas } from "runner/fieldy/interfaces";
import { fieldReduce } from "./field";
var idSeed = 1
function makeId() {
  idSeed = idSeed + 1
  return "field-" + idSeed
}

export function formReduce(state: FormState, action: IAction<any>): FormState | undefined {
  switch (action.type) {
    case SET_FORM_FIELDS:
      const fields = makeFields((action.payload as SetFormFieldsPayload).fieldSchemas)
      return {
        ...state,
        fields,
        fieldMetas: (action.payload as SetFormFieldsPayload).fieldSchemas,
        mounted: true,
      }
    case SET_FORM_FLAT_VALUES: {
      return setFlatValues(state, (action.payload as SetFormValuesPayload).values)
    }
    case SET_FORM_INITIAL_VALUES: {
      const flatInitialValues = patFlatValues((action.payload as SetFormValuesPayload).values, state.fields)
      const stateWithInitialValues = setInitialFlatValues(state, flatInitialValues)
      return {
        ...state,
        ...stateWithInitialValues,
        originalValue: (action.payload as SetFormValuesPayload).values,
        initialized: true,
      }
    }
    case SET_FORM_VALUES: {
      const flatValues = patFlatValues((action.payload as SetFormValuesPayload).values, state.fields)
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

function patFlatValues(values: FormValue | undefined, allFields: FieldsState, parentFieldPath?: string) {
  const prefix = parentFieldPath ? parentFieldPath + "." : ""
  let flatValues: FormValue = {}
  const childFields = getChildFields(allFields, parentFieldPath)
  for (const meta of childFields) {
    if (!meta.name) {
      continue
    }
    const path = prefix + meta.name

    flatValues[path] = values?.[meta.name]
    const subValues = patFlatValues(values?.[meta.name], allFields, path)
    flatValues = { ...flatValues, ...subValues }
  }

  return flatValues
}


function makeFields(fieldSchemas: IFieldMetas) {
  let flatFields: FieldsState = {}
  for (const path of Object.keys(fieldSchemas)) {
    const meta = fieldSchemas[path]
    flatFields[path] = {
      id: makeId(),
      ...meta,
      path: path,
      basePath: path.substring(0, path.length - (meta.name?.length || 0) - 1),
      mounted: true,
      meta: meta
    }
  }
  return flatFields
}

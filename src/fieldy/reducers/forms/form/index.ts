import { SetFormFieldsPayload, SetFormInitializedFlagPayload, SetFormValuesPayload, SET_FORM_FIELDS, SET_FORM_FLAT_VALUES, SET_FORM_INITIALZED_FLAG, SET_FORM_INITIAL_VALUES, SET_FORM_VALUES } from "fieldy/actions";
import { FieldsState, FormState, FormValue, IAction, IFieldSchema } from "fieldy/interfaces";
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

    case SET_FORM_INITIALZED_FLAG: {
      return {
        ...state,
        initialized: (action.payload as SetFormInitializedFlagPayload).initialized
      }
    }
  }
  return state
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

  for (const key of Object.keys(state?.fields || {})) {
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
function patFlatValues(values: FormValue, fieldSchemas: IFieldSchema[], parentFieldPath?: string) {
  const prefix = parentFieldPath ? parentFieldPath + "." : ""
  let flatValues: FormValue = {}
  for (const fieldSchema of fieldSchemas) {
    const { fields, ...meta } = fieldSchema
    if (Object.keys(fields).length > 0 && meta.type !== "object") {
      console.error("Not object type field has sub field")
    }
    const path = prefix + fieldSchema.name
    flatValues[path] = values[fieldSchema.name]
    if (fieldSchema.fields.length) {
      const subValues = patFlatValues(values[fieldSchema.name], fieldSchema.fields, path)
      flatValues = { ...flatValues, ...subValues }
    }
  }

  return flatValues
}

function patFlatFieldSchema(fieldSchemas: IFieldSchema[], parentFieldPath?: string) {
  const prefix = parentFieldPath ? parentFieldPath + "." : ""
  let flatFields: FieldsState = {}
  for (const fieldSchema of fieldSchemas) {
    const { fields, ...meta } = fieldSchema
    if (Object.keys(fields).length > 0 && meta.type !== "object") {
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


import { SET_FORM_FIELDS, SetFormFieldsPayload, SET_FORM_FLAT_VALUES, SetFormValuesPayload, SET_FORM_INITIAL_VALUES, SET_FORM_VALUES, SET_MULTI_FIELD_VALUES, SET_FORM_INITIALZED_FLAG, SetFormInitializedFlagPayload, FieldActionPayload, SET_FIELD_VALUE, ADD_FORM_FIELDS, REMOVE_FORM_FIELDS, RemoveFormFieldsPayload } from "runner/fieldy/actions";
import { getChildFields, makePath } from "runner/fieldy/funcs/path";
import { FieldsState, FormState, FormValue, IAction, IFieldSchema } from "runner/fieldy/interfaces";
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
        fieldSchemas: (action.payload as SetFormFieldsPayload).fieldSchemas,
        mounted: true,
      }
    case ADD_FORM_FIELDS:
      const addFieldValuePayload = action.payload as SetFormFieldsPayload
      const newFields = makeFields((action.payload as SetFormFieldsPayload).fieldSchemas)
      return {
        ...state,
        fieldSchemas: [...state.fieldSchemas, ...addFieldValuePayload.fieldSchemas],
        fields: { ...state.fields, ...newFields },
      }
    case REMOVE_FORM_FIELDS:
      const removeFieldValuePayload = action.payload as RemoveFormFieldsPayload
      const leftFields = {} as FieldsState
      for (const key of Object.keys(state.fields)) {
        if (!removeFieldValuePayload.paths?.find(path => path === key)) {
          leftFields[key] = state.fields[key]
        }
      }
      return {
        ...state,
        fieldSchemas: state.fieldSchemas.filter(field => !removeFieldValuePayload.paths?.find(path => path === field.path)),
        fields: leftFields,
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


function makeFields(fieldSchemas: IFieldSchema[]) {
  let flatFields: FieldsState = {}
  for (const schema of fieldSchemas) {
    //没有name的一般都是辅助项目，除了fragement
    if (schema.name) {
      flatFields[schema.path] = {
        ...flatFields[schema.path],
        id: makeId(),
        ...schema,
        basePath: schema.path.substring(0, schema.path.length - (schema.name?.length || 0) - 1),
        mounted: true,
        meta: schema
      }
    } else if (schema.type === 'fragment') {
      for (const fragMeta of schema.fragmentFields || []) {
        const fragPath = makePath(schema.path, fragMeta.name)
        flatFields[fragPath] = {
          ...flatFields[fragPath],
          id: makeId(),
          ...fragMeta,
          path: fragPath,
          basePath: schema.path,
          mounted: true,
          meta: fragMeta
        }
      }
    }

  }

  return flatFields
}

import { SET_FORM_FIELDS, SetFormFieldsPayload, ADD_FORM_FIELDS, REMOVE_FORM_FIELDS, RemoveFormFieldsPayload, SetFormValuePayload, SET_FORM_FLAT_VALUE, SET_MULTI_FIELD_VALUES, SET_FORM_INITIAL_VALUE, SET_FORM_VALUE, FieldActionPayload } from "runner/fieldy/actions";
import { getChildFields, makePath } from "runner/fieldy/funcs/path";
import { FieldsState, FormValue, IAction, IFieldSchema } from "runner/fieldy/interfaces";
import { fieldReduce } from "./field";

var idSeed = 1
function makeId() {
  idSeed = idSeed + 1
  return "field-" + idSeed
}

export function fieldsReduer(state: FieldsState, action: IAction<any>): FieldsState {
  switch (action.type) {
    case SET_FORM_FIELDS:
      const fields = makeFields((action.payload as SetFormFieldsPayload).fieldSchemas)
      return fields
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
    case SET_FORM_FLAT_VALUE: {
      return setFlatValues(state, (action.payload as SetFormValuePayload).value)
    }
    case SET_MULTI_FIELD_VALUES: {
      return setFlatValues(state, (action.payload as SetFormValuePayload).value)
    }
    case SET_FORM_INITIAL_VALUE: {
      const flatInitialValues = patFlatValues((action.payload as SetFormValuePayload).value, state)
      return setInitialFlatValues(state, flatInitialValues)
    }
    case SET_FORM_VALUE: {
      const flatValues = patFlatValues((action.payload as SetFormValuePayload).value, state)
      return setFlatValues(state, flatValues)
    }
  }
  
  const payload = action.payload as FieldActionPayload
  let newState = state

  if (payload.path) {
    const filedState = newState[payload.path]
    if (filedState) {
      const fieldState = fieldReduce(filedState, action)
      return { ...newState, [payload.path]: fieldState }
    }
  }
  return newState
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

function setFlatValues(state: FieldsState, flatValues: any = {}) {
  const newFields = {} as FieldsState
  for (const key of Object.keys(flatValues || {})) {
    const fieldState = state?.[key]
    if (fieldState) {
      newFields[key] = {
        ...fieldState,
        value: flatValues[key]
      } as any
    }
  }
  return Object.assign({}, state.fields, newFields)
}

function setInitialFlatValues(state: FieldsState, flatValues: any = {}):FieldsState {
  const newFields = {} as FieldsState
  for (const key of Object.keys(state?.fields || {})) {
    const fieldState = state?.[key]
    if (fieldState) {
      newFields[key] = {
        ...fieldState,
        initialValue: flatValues[key],
        value: flatValues[key]
      }
    }

  }
  return { ...state, ...newFields }
}

function patFlatValues(value: FormValue | undefined, allFields: FieldsState, parentFieldPath?: string) {
  const prefix = parentFieldPath ? parentFieldPath + "." : ""
  let flatValues: FormValue = {}
  const childFields = getChildFields(allFields, parentFieldPath)
  for (const meta of childFields) {
    if (!meta.name) {
      continue
    }
    const path = prefix + meta.name

    flatValues[path] = value?.[meta.name]
    const subValues = patFlatValues(value?.[meta.name], allFields, path)
    flatValues = { ...flatValues, ...subValues }
  }
  return flatValues
}

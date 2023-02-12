import { IAction } from "core/interfaces/action";
import { SET_FORM_FIELDS, SetFormFieldsPayload, ADD_FORM_FIELDS, REMOVE_FORM_FIELDS, RemoveFormFieldsPayload } from "runner/fieldy/actions";
import { makePath } from "runner/fieldy/funcs/path";
import { FieldsState, IFieldSchema } from "runner/fieldy/interfaces";

var idSeed = 1
function makeId() {
  idSeed = idSeed + 1
  return "field-" + idSeed
}

export function fieldsReduer(state: FieldsState, action:IAction<any>):FieldsState{
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
  }
  return state
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

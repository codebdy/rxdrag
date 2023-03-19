import { IAction } from "core/interfaces/action";
import { SET_FORM_FIELDS, SetFormFieldsPayload, ADD_FORM_FIELDS, REMOVE_FORM_FIELDS, RemoveFormFieldsPayload } from "runner/fieldy/actions";
import { IFieldSchema } from "runner/fieldy/interfaces";

export function fieldSchemasReduer(state: IFieldSchema[], action: IAction<any>) {
  switch (action.type) {
    case SET_FORM_FIELDS:
      return (action.payload as SetFormFieldsPayload).fieldSchemas
    case ADD_FORM_FIELDS:
      const addFieldValuePayload = action.payload as SetFormFieldsPayload
      return [...state, ...addFieldValuePayload.fieldSchemas]
    case REMOVE_FORM_FIELDS:
      const removeFieldValuePayload = action.payload as RemoveFormFieldsPayload
      return state.filter(field => !removeFieldValuePayload.paths?.find(path => path === field.path))
  }
  return state
}

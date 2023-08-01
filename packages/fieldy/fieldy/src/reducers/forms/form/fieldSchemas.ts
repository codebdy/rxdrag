import { SET_FORM_FIELDS, SetFormFieldsPayload, ADD_FORM_FIELDS, REMOVE_FORM_FIELDS, RemoveFormFieldsPayload } from "../../../actions";
import { IFieldSchema } from "../../../interfaces/fieldy";
import { IAction } from "../../../interfaces/fieldy";

export function fieldSchemasReduer(state: IFieldSchema[], action: IAction<unknown>) {
  const addFieldValuePayload = action.payload as SetFormFieldsPayload
  const removeFieldValuePayload = action.payload as RemoveFormFieldsPayload

  switch (action.type) {
    case SET_FORM_FIELDS:
      return (action.payload as SetFormFieldsPayload).fieldSchemas
    case ADD_FORM_FIELDS:
      return [...state, ...addFieldValuePayload.fieldSchemas]
    case REMOVE_FORM_FIELDS:
      return state.filter(field => !removeFieldValuePayload.paths?.find(path => path === field.path))
  }
  return state
}

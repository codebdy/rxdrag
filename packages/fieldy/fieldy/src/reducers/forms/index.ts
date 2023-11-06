import { FormActionPayload, REMOVE_FORM, CREATE_FORM, RESET_FORM } from "../../actions";
import { FormsState } from "..";
import { IAction } from "../../interfaces/fieldy";
import { formReduce } from "./form";

export function formsReduce(state: FormsState, action: IAction<FormActionPayload>): FormsState {
  if (action.payload) {
    switch (action.type) {
      case REMOVE_FORM:
        return {
          ...state,
          [action.payload.formName]: undefined,
        }
      case CREATE_FORM:
        return {
          ...state,
          [action.payload.formName]: {
            fields: {},
            fieldSchemas: [],
          }
        }
      case RESET_FORM: {
        const formState = state?.[action.payload.formName]
        return {
          ...state,
          [action.payload.formName]: {
            ...formState,
            value: formState?.defaultValue || {}
          } as any
        }
      }
    }
    const formSate = state[action.payload.formName]
    if (action.payload.formName && formSate) {
      const newState = {
        ...state,
        [action.payload.formName]: formReduce(formSate, action)
      }
      //console.log("Fieldy store变化, newState, action:", newState, action)
      return newState
    }
  }
  return state
}

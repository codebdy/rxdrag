import { FormActionPayload } from "../actions"
import { FormState, IAction } from "../interfaces/fieldy"
import { formsReduce } from "./forms"

export type FormsState = {
	[name: string]: FormState | undefined
}

export type State = {
	forms: FormsState
}

const initialState: State = {
	forms: {}
}

export function reduce(state: State = initialState, action: IAction<FormActionPayload>): State {
	return {
		forms: formsReduce(state.forms, action)
	}
}

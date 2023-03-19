import { FormActionPlayload } from "../actions"
import { FormState, IAction } from "../interfaces"
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

export function reduce(state: State = initialState, action: IAction<FormActionPlayload>): State {
	return {
		forms: formsReduce(state.forms, action)
	}
}

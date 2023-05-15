import { ActionType } from "../actions";
export function selectedReducer(state, action) {
    switch (action.type) {
        case ActionType.SELECTION: {
            return action.payload;
        }
    }
    return state;
}

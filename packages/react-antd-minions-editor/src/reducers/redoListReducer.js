import { ActionType } from "../actions";
export function redoListReducer(state, action) {
    switch (action.type) {
        case ActionType.BACKUP: {
            return [];
        }
        case ActionType.SET_REDOLIST: {
            return action.payload;
        }
    }
    return state;
}

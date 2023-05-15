import { ActionType } from "../actions";
export function undoListReducer(state, action) {
    switch (action.type) {
        case ActionType.BACKUP: {
            return [...state, action.payload];
        }
        case ActionType.SET_UNOLIST: {
            return action.payload;
        }
    }
    return state;
}

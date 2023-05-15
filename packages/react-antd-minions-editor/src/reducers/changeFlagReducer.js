import { ActionType } from "../actions";
export function changeFlagReducer(state, action) {
    switch (action.type) {
        case ActionType.SET_CHANGE_FLAG: {
            return action.payload;
        }
    }
    return state;
}

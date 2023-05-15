import { ActionType } from "../actions";
export function zoomReducer(state, action) {
    switch (action.type) {
        case ActionType.SET_ZOOM: {
            return action.payload;
        }
    }
    return state;
}

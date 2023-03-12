import { DocumentSelectionMode } from "interfaces";
import { SET_SELECTION_MODE } from "actions/registry";
export function selectionMode(state = DocumentSelectionMode.Normal, action) {
    switch(action.type){
        case SET_SELECTION_MODE:
            var _action_payload;
            return ((_action_payload = action.payload) === null || _action_payload === void 0 ? void 0 : _action_payload.mode) || DocumentSelectionMode.Normal;
        default:
            return state;
    }
}

//# sourceMappingURL=selectionMode.js.map
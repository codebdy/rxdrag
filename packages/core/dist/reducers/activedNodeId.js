import { ACTIVE_NODE } from "actions/registry";
export function activedNodeId(state, action) {
    if (action.type === ACTIVE_NODE) {
        return action.payload;
    }
    return state;
}

//# sourceMappingURL=activedNodeId.js.map
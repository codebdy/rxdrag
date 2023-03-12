import { CHANGE_ACTIVED_DOCUMENT } from "actions/registry";
export function activedDocumentId(state = null, action) {
    if (action.type === CHANGE_ACTIVED_DOCUMENT) {
        return action.payload || null;
    }
    return state;
}

//# sourceMappingURL=activedDocumentId.js.map
import { RECOVER_SNAPSHOT, SELECT_NODES } from "actions/registry";
export function selectedIds(state = null, action) {
    const { payload  } = action;
    switch(action.type){
        case SELECT_NODES:
            return (payload === null || payload === void 0 ? void 0 : payload.targetIds) || null;
        case RECOVER_SNAPSHOT:
            return payload === null || payload === void 0 ? void 0 : payload.snapshot.selectedIds;
        default:
            return state;
    }
}

//# sourceMappingURL=selectedIds.js.map
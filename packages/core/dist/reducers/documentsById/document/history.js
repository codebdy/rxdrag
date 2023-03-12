import { BACKUP } from "actions/registry";
export function history(state = [], action) {
    const { payload  } = action;
    switch(action.type){
        case BACKUP:
            if (payload) {
                return [
                    ...state,
                    {
                        nodes: payload.nodes,
                        selectedIds: payload.selectedIds,
                        actionType: payload.actionType,
                        createdAt: Date.now()
                    }
                ];
            }
            return state;
        default:
            return state;
    }
}

//# sourceMappingURL=history.js.map
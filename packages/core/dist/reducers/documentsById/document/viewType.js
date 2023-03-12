import { CHANGE_DOCUMENT_VIEW_TYPE } from "actions/registry";
import { DefulstViewType } from "interfaces";
export function viewType(state = DefulstViewType, action) {
    const { payload  } = action;
    switch(action.type){
        case CHANGE_DOCUMENT_VIEW_TYPE:
            return (payload === null || payload === void 0 ? void 0 : payload.viewType) || DefulstViewType;
        default:
            return state;
    }
}

//# sourceMappingURL=viewType.js.map
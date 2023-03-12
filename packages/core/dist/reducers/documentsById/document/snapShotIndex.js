import { GOTO } from "actions/registry";
export function snapShotIndex(state, action) {
    const { payload  } = action;
    switch(action.type){
        case GOTO:
            {
                return (payload === null || payload === void 0 ? void 0 : payload.index) || 0;
            }
        default:
            return state;
    }
}

//# sourceMappingURL=snapShotIndex.js.map
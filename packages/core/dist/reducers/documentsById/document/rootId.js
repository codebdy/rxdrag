import { INITIALIZE } from "actions/registry";
export function rootId(state, action) {
    const { payload  } = action;
    switch(action.type){
        case INITIALIZE:
            return payload === null || payload === void 0 ? void 0 : payload.rootId;
        default:
            return state;
    }
}

//# sourceMappingURL=rootId.js.map
import { CHANGE_CANVAS_WIDTH_LIMITS } from "actions/registry";
export function canvasWidthLimits(state = null, action) {
    const { payload  } = action;
    switch(action.type){
        case CHANGE_CANVAS_WIDTH_LIMITS:
            return (payload === null || payload === void 0 ? void 0 : payload.limits) || null;
        default:
            return state;
    }
}

//# sourceMappingURL=canvasWidthLimits.js.map
import { CHANGE_CANVAS_WIDTH } from "actions/registry";
export function canvasWidth(state = null, action) {
    const { payload  } = action;
    switch(action.type){
        case CHANGE_CANVAS_WIDTH:
            return (payload === null || payload === void 0 ? void 0 : payload.width) || null;
        default:
            return state;
    }
}

//# sourceMappingURL=canvasWidth.js.map
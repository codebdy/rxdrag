import { DRAG_HOVER } from "actions/registry";
export function reduce(state = null, action) {
    const { payload  } = action;
    switch(action.type){
        case DRAG_HOVER:
            return payload || null;
        default:
            return state;
    }
}

//# sourceMappingURL=dragOver.js.map
import { END_DRAG_NODES, START_DRAG_NODES } from "actions/registry";
export function draggingNodes(state = null, action) {
    const { payload  } = action;
    switch(action.type){
        case START_DRAG_NODES:
            if (!payload) {
                return state;
            }
            return {
                nodeIds: payload === null || payload === void 0 ? void 0 : payload.nodeIds,
                initialMousePosition: payload.initialMousePosition,
                offset: payload.offset,
                mousePosition: payload.mousePosition
            };
        case END_DRAG_NODES:
            return null;
        default:
            return state;
    }
}

//# sourceMappingURL=draggingNodes.js.map
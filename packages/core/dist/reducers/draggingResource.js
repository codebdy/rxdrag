import { END_DRAG_RESOURCE, START_DRAG_RESOURCE } from "actions/registry";
export function draggingResource(state = null, action) {
    const { payload  } = action;
    switch(action.type){
        case START_DRAG_RESOURCE:
            if (payload) {
                return {
                    resource: payload === null || payload === void 0 ? void 0 : payload.resourceId,
                    initialMousePosition: payload.initialMousePosition,
                    offset: payload.offset,
                    mousePosition: payload.mousePosition
                };
            } else {
                return state;
            }
        case END_DRAG_RESOURCE:
            return null;
        default:
            return state;
    }
}

//# sourceMappingURL=draggingResource.js.map
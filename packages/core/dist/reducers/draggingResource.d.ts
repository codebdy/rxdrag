import { IAction, StartDragResourceOptions } from "interfaces/action";
import { ID, IXYCoord } from "interfaces/types";
export type DraggingResourceState = {
    initialMousePosition: IXYCoord;
    offset: IXYCoord;
    resource: ID;
    mousePosition: IXYCoord;
} | null;
export declare function draggingResource(state: DraggingResourceState | undefined, action: IAction<StartDragResourceOptions>): DraggingResourceState;

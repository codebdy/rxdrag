import { IAction, StartDragNodesOptions } from "interfaces/action";
import { ID, IXYCoord } from "interfaces/types";
export type DraggingNodesState = {
    initialMousePosition: IXYCoord;
    offset: IXYCoord;
    nodeIds: ID[];
    mousePosition: IXYCoord;
} | null;
export declare function draggingNodes(state: DraggingNodesState | undefined, action: IAction<StartDragNodesOptions>): DraggingNodesState;

import { ID, DocumentSelectionMode } from "interfaces";
import { CanvasWidthLimits, IDocumentAction, ISnapshot, ViewType } from "../../../interfaces/document";
export type DocumentState = {
    selectionMode: DocumentSelectionMode;
    changed: boolean;
    selectedIds: ID[] | null;
    history: ISnapshot[];
    rootId?: ID;
    snapshotIndex: number;
    canvasWidth: number | null;
    canvasWidthLimits: CanvasWidthLimits | null;
    viewType: ViewType;
};
export declare function documentReduce(state: DocumentState | undefined, action: IDocumentAction<any>): DocumentState;

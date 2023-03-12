import { CanvasWidthLimits, ID, IDesignerEngine, DocumentSelectionMode } from "interfaces";
import { DrageOverOptions, IActions, StartDragNodesOptions, StartDragResourceOptions, ThemeMode } from "interfaces/action";
export declare class Actions implements IActions {
    private engine;
    constructor(engine: IDesignerEngine);
    setThemeMode(mode: ThemeMode): void;
    changeActivedDocument(documentId: ID | null): void;
    dragover(payload: DrageOverOptions | null): void;
    startDragResource(payload: StartDragResourceOptions): void;
    endDragResouce(): void;
    startDragNodes(payload: StartDragNodesOptions): void;
    endDragNodes(): void;
    selectNodes(targetIds: string[], documentId: string): void;
    setSelectionMode(documentId: string, mode: DocumentSelectionMode): void;
    activeNode(payload?: string | null): void;
    changeCanvasWidth(documentId: string, width: number | null): void;
    changeCanvasWidthLimits(documentId: string, limits: CanvasWidthLimits | null): void;
    changeDocumentView(documentId: string, viewType: string): void;
}

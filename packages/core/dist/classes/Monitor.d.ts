import type { Store } from 'redux';
import { ActiveDocumentListener, ActiveNodeListener, CanvasWidthLimitsListener, CanvasWidthListener, CurrentNodesChangeListener, DocumentViewListener, DraggingNodesListener, DraggingResourceListener, DragOverListener, HistoryListener, ID, IMonitor, ITreeNode, LangListener, Listener, NodeListener, SelectedChangeListener, DocumentSelectionMode, SelectionModeListener, SnapshotIndexListener, ThemeModeListener, Unsubscribe } from '../interfaces/index';
import type { State } from '../reducers/index';
import { DragOverState } from 'reducers/dragOver';
/**
 * 为优化性能而生
 */
export declare class NodeChangeHandler {
    listeners: {
        [id: ID]: NodeListener[] | undefined;
    };
    handleNodeChange: (node: ITreeNode) => void;
    subscribeToNodeChanged: (id: ID, listener: NodeListener) => Unsubscribe;
    removeListener(id: ID, listener: NodeListener): void;
}
export declare class Monitor implements IMonitor {
    private store;
    private nodechnageHandler;
    constructor(store: Store<State>);
    getSelectionMode(document: string): DocumentSelectionMode;
    getCurrentNode(): ITreeNode | null;
    getCurrentTree(): ITreeNode | null;
    getNodeDocumentId(nodeId: string): string | undefined;
    getNode(nodeId: string): ITreeNode | null;
    getDocumentRootNode(doumentId: ID): ITreeNode | null;
    getState(): State;
    subscribeToDraggingNodes(listener: DraggingNodesListener): Unsubscribe;
    subscribeToDraggingResource(listener: DraggingResourceListener): Unsubscribe;
    subscribeToDragOver(listener: DragOverListener): Unsubscribe;
    getCurrentSelectedIds(): string[] | null;
    getDocumentSelectedIds(documentId: ID): ID[] | null;
    getDrageOver(): DragOverState;
    subscribeToStateChange(listener: Listener): Unsubscribe;
    subscribeToSelectChange(listener: SelectedChangeListener): Unsubscribe;
    subscribeToCurrentNodeChanged(listener: CurrentNodesChangeListener): Unsubscribe;
    subscribeToHasNodeChanged(listener: Listener): Unsubscribe;
    subscribeToNodeChanged(id: ID, listener: NodeListener): Unsubscribe;
    subscribeToLangeChange(listener: LangListener): Unsubscribe;
    subscribeToThemeModeChange(listener: ThemeModeListener): Unsubscribe;
    subscribeToActiveDocumentChanged(listener: ActiveDocumentListener): Unsubscribe;
    subscribeToActiveChanged(listener: ActiveNodeListener): Unsubscribe;
    subscribeToHistoryChange(documentId: string, listener: HistoryListener): Unsubscribe;
    subscribeToSnapshotIndexChange(documentId: string, listener: SnapshotIndexListener): Unsubscribe;
    subscribeToCanvasWidthChange(documentId: string, listener: CanvasWidthListener): Unsubscribe;
    subscribeToCanvasWidthLimitsChange(documentId: string, listener: CanvasWidthLimitsListener): Unsubscribe;
    subscribeToDocumentViewChange(documentId: string, listener: DocumentViewListener): Unsubscribe;
    subscribeToSelectionMode(documentId: string, listener: SelectionModeListener): Unsubscribe;
    isDragging(): boolean;
    private getSeletedNodeId;
    private doSubscribeToNodeChanged;
}

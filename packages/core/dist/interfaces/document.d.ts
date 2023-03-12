import { NodesById } from "reducers/nodesById";
import { IAction } from "./action";
import { DocumentActionPayload } from "./payloads";
import { ID, RxProps } from "./types";
export type CanvasWidthLimits = {
    minWidth?: number;
    maxWidth?: number;
};
export interface ISnapshot {
    nodes: NodesById;
    selectedIds: ID[] | null;
    actionType: HistoryableActionType;
    createdAt: number;
}
export interface NodeChunk {
    rootNodes: ITreeNode[];
    nodesById: NodesById;
}
export declare enum NodeRelativePosition {
    InTop = 1,
    InBottom = 2,
    Before = 3,
    After = 4
}
export type NodeListener = (node: ITreeNode) => void;
export interface IDocumentAction<Payload extends DocumentActionPayload> extends IAction<Payload> {
    payload?: Payload;
}
export type ViewType = "design" | "json" | "preview" | string;
export declare const DefulstViewType = "design";
export interface INodeMeta<IField = any, IReactions = any> {
    componentName: string;
    props?: {
        [key: string]: any;
    };
    "x-field"?: IField;
    "x-reactions"?: IReactions;
    locked?: boolean;
    selfRender?: boolean;
}
export interface IDesignerProps {
    style?: any;
    [key: string]: any;
}
export interface ITreeNode {
    id: ID;
    title?: string;
    description?: string;
    meta: INodeMeta;
    parentId?: ID;
    children: ID[];
    isSlot: boolean;
    slots?: {
        [name: string]: ID;
    };
    documentId: ID;
    rxProps?: RxProps;
    designerProps?: IDesignerProps;
    designerSchema?: INodeSchema;
}
export interface NodeBehavior {
    isDisabled: () => boolean;
    isSelectable: () => boolean;
    isDroppable: () => boolean;
    isDraggable: () => boolean;
    isDeletable: () => boolean;
    isCloneable: () => boolean;
    isNoPlaceholder: () => boolean;
    isNoRef: () => boolean;
    isLockable: () => boolean;
}
export interface INodeSchema<IField = any, IReactions = any> extends INodeMeta<IField, IReactions> {
    children?: INodeSchema[];
    slots?: {
        [name: string]: INodeSchema | undefined;
    };
}
export declare enum HistoryableActionType {
    Default = "Default",
    Add = "Add",
    Move = "Move",
    Remove = "Remove",
    Copy = "Copy",
    Clone = "Clone",
    Change = "Change",
    RemoveSlot = "RemoveSlot",
    AddSlot = "AddSlot"
}
/**
 * 文档模型，类似语法糖，对Engine部分接口的封装
 */
export interface IDocument {
    id: ID;
    destory(): void;
    initialize(rootSchema: INodeSchema, documentId: ID): void;
    moveTo(sourceId: ID, targetId: ID, pos: NodeRelativePosition): void;
    multiMoveTo(sourceIds: ID[], targetId: ID, pos: NodeRelativePosition): void;
    addNewNodes(elements: INodeSchema | INodeSchema[], targetId: ID, pos: NodeRelativePosition): NodeChunk;
    remove(sourceId: ID): void;
    clone(sourceId: ID): void;
    changeNodeMeta(id: ID, newMeta: INodeMeta): void;
    removeSlot(id: ID, name: string): void;
    addSlot(id: ID, name: string): void;
    dispatch(action: IDocumentAction<any>): void;
    backup(actionType: HistoryableActionType): void;
    undo(): void;
    redo(): void;
    goto(index: number): void;
    getRootNode(): ITreeNode | null;
    getNode(id: ID): ITreeNode | null;
    getSchemaTree(): INodeSchema | null;
}

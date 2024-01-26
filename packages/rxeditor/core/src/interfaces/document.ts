import { IAction } from "./action";
import { DocumentActionPayload } from "./payloads";
import { ID, IXYCoord, RxProps } from "./types";
import { IViewSchema, INodeMeta, INodeSchema } from "@rxdrag/schema"

export type NodesById = {
  [id in ID]: ITreeNode
}

export type CanvasWidthLimits = {
  minWidth?: number,
  maxWidth?: number,
}

export interface ISnapshot {
  nodes: NodesById;
  selectedIds: ID[] | null;
  actionType: HistoryableActionType;
  createdAt: number;
}

export interface NodeChunk {
  rootNodes: ITreeNode[]
  nodesById: NodesById
}

export enum NodeRelativePosition {
  InTop = 1,
  InBottom,
  Before,
  After,
}
export type NodeListener = (node: ITreeNode) => void

export interface IDocumentAction<Payload extends DocumentActionPayload> extends IAction<Payload> {
  payload?: Payload
}

export type ViewType = "design" | "json" | "preview" | string
export const DefulstViewType = "design"


export interface IDesignerProps {
  style?: unknown
  [key: string]: unknown,
}

export interface ITreeNode<IField = unknown, INodeController = unknown> {
  id: ID
  title?: string
  description?: string
  meta: INodeMeta<IField, INodeController>
  parentId?: ID
  children: ID[]
  isSlot: boolean,
  slots?: {
    [name: string]: ID
  }
  documentId: ID
  //标识专用属性，不通过外部传入，系统自动构建
  rxProps?: RxProps
  //设计时的属性，比如readOnly， open等
  designerProps?: IDesignerProps
  //用来编辑属性的schema
  propsSchema?: INodeSchema
}


export enum HistoryableActionType {
  Default = "Default",
  Add = "Add",
  Move = "Move",
  Remove = "Remove",
  Copy = "Copy",
  Clone = "Clone",
  Change = "Change",
  RemoveSlot = "RemoveSlot",
  AddSlot = "AddSlot",
  Resize = "Resize",
  Rotate = "Rotate"
}

/**
 * 文档模型，类似语法糖，对Engine部分接口的封装
 */
export interface IDocument {
  id: ID
  destroy(): void

  initialize(meta: IViewSchema): void
  moveTo(sourceId: ID, targetId: ID, pos: NodeRelativePosition): void
  multiMoveTo(sourceIds: ID[], targetId: ID, pos: NodeRelativePosition): void
  addNewNodes(elements: INodeSchema | INodeSchema[], targetId: ID, pos: NodeRelativePosition): NodeChunk
  addNewFreedomNodes(elements: INodeSchema | INodeSchema[], targetId: ID, absolutePosition: IXYCoord): NodeChunk
  remove(sourceId: ID): void
  clone(sourceId: ID): void
  changeNodeMeta(id: ID, newMeta: INodeMeta): void
  clearChanged(): void
  removeSlot(id: ID, name: string): void
  addSlot(id: ID, name: string): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch(action: IDocumentAction<any>): void
  backup(actionType: HistoryableActionType): void
  undo(): void
  redo(): void
  goto(index: number): void

  getRootNode(): ITreeNode | null
  getNode(id: ID): ITreeNode | null

  getSchemaTree(): INodeSchema | null

  getTitle(): string | undefined
}

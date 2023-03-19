import { NodesById } from "core/reducers/nodesById";
import { IAction } from "./action";
//import { IDesignerParams } from "./component";
import { DocumentActionPayload } from "./payloads";
import { ID, RxProps } from "./types";

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
  After
}
export type NodeListener = (node: ITreeNode) => void

export interface IDocumentAction<Payload extends DocumentActionPayload> extends IAction<Payload> {
  payload?: Payload
}

export type ViewType = "design" | "json" | "preview" | string
export const DefulstViewType = "design"

export interface INodeMeta<IField = any, IReactions = any> {
  componentName: string,
  props?: {
    [key: string]: any,
  },
  "x-field"?: IField,
  "x-reactions"?: IReactions,
  //锁定子控件
  locked?: boolean,
  //自己渲染，引擎不渲染
  selfRender?: boolean,
}

export interface IDesignerProps {
  style?: any
  [key: string]: any,
}

export interface ITreeNode {
  id: ID
  title?: string
  description?: string
  meta: INodeMeta
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
  designerSchema?: INodeSchema
  //设计器专用属性，比如是否锁定
  //designerParams?: IDesignerParams
}

export interface NodeBehavior {
  isDisabled: () => boolean
  isSelectable: () => boolean
  isDroppable: () => boolean
  isDraggable: () => boolean
  isDeletable: () => boolean
  isCloneable: () => boolean
  isNoPlaceholder: () => boolean
  isNoRef: () => boolean
  isLockable: () => boolean
}

export interface INodeSchema<IField = any, IReactions = any> extends INodeMeta<IField, IReactions> {
  //name?: string,
  //引用一段schema，ref赋值name，用于框架等分块编辑
  //ref?: string,
  children?: INodeSchema[]
  slots?: {
    [name: string]: INodeSchema | undefined
  }
}

// export interface IBlocksSchema {
//   [bolckName: string]: INodeSchema
// }

// export interface IBlocksTreeNode {
//   [bolckName: string]: ITreeNode
// }

export enum HistoryableActionType {
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
  id: ID
  destory(): void

  initialize(rootSchema: INodeSchema, documentId: ID): void
  moveTo(sourceId: ID, targetId: ID, pos: NodeRelativePosition): void
  multiMoveTo(sourceIds: ID[], targetId: ID, pos: NodeRelativePosition): void
  addNewNodes(elements: INodeSchema | INodeSchema[], targetId: ID, pos: NodeRelativePosition): NodeChunk
  remove(sourceId: ID): void
  clone(sourceId: ID): void
  changeNodeMeta(id: ID, newMeta: INodeMeta): void
  removeSlot(id: ID, name: string): void
  addSlot(id: ID, name: string): void
  dispatch(action: IDocumentAction<any>): void
  backup(actionType: HistoryableActionType): void
  undo(): void
  redo(): void
  goto(index: number): void

  getRootNode(): ITreeNode | null
  getNode(id: ID): ITreeNode | null

  getSchemaTree(): INodeSchema | null
}

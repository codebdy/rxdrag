import { NodesById } from "core/reducers/nodesById";
import { IAction } from "./action";
import { IDesignerParams } from "./component";
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

// export interface IReactionMeta {

// }

// export interface IFieldMeta {
//   type?: "object" | "array" | "normal"
//   name: string
//   validateRule?: any
//   defaultValue?: any
//   valueProps?: string,
//   //设置收集字段值变更的时机
//   trigger?: string | string[],
//   //是否接管输入输出控制，normal 类型默认true，其它默认 false
//   withControl?: boolean
// }

export interface INodeMeta<IField = any> {
  componentName: string,
  props?: {
    [key: string]: any,
  },
  "x-field"?: IField,
  [key: string]: any,
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
  //设计器专用属性，比如是否弹窗的标志及状态
  designerParams?: IDesignerParams
}

export interface NodeBehavior {
  isDisabled: () => boolean
  isSelectable: () => boolean
  isDroppable: () => boolean
  isDraggable: () => boolean
  isDeletable: () => boolean
  isCloneable: () => boolean
  isNoPlaceholder: () => boolean
}

export interface INodeSchema<IField = any> extends INodeMeta<IField> {
  //引用一段schema，ref赋值name，用于框架等分块编辑
  ref?: string,
  children?: INodeSchema[]
  slots?: {
    [name: string]: INodeSchema | undefined
  }
}

export interface IBlocksSchema {
  [bolckName: string]: INodeSchema
}

export interface IBlocksTreeNode {
  [bolckName: string]: ITreeNode
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
  AddSlot = "AddSlot"
}

/**
 * 文档模型，类似语法糖，对Engine部分接口的封装
 */
export interface IDocument {
  id: ID
  receiveSchema(schema: INodeSchema | IBlocksSchema): ITreeNode | IBlocksTreeNode
  destory(): void
  transformNodeToSchema(node: ITreeNode): INodeSchema

  initialize(rootSchema: INodeSchema, documentId: ID): void
  moveTo(sourceId: ID, targetId: ID, pos: NodeRelativePosition): void
  multiMoveTo(sourceIds: ID[], targetId: ID, pos: NodeRelativePosition): void
  addNewNodes(elements: INodeSchema | INodeSchema[], targetId: ID, pos: NodeRelativePosition): NodeChunk
  addNodeFormOutside(outsideNode: ITreeNode, targetId: ID, pos: NodeRelativePosition): void
  remove(sourceId: ID): void
  clone(sourceId: ID): void
  copyTo(sourceId: ID, targetId: ID, pos: NodeRelativePosition): void
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
  getSchemaBlockNode(id: ID): ITreeNode | null

  getSchemaTree(): INodeSchema | null
}

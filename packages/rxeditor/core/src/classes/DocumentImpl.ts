/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeRxId } from "@rxdrag/shared";
import { HistoryableActionType, IDocument, IDocumentAction, ISnapshot, ITreeNode, NodeChunk, NodeRelativePosition, NodesById } from "../interfaces/document";
import { AddNodesPayload, BackupPayload, ChangeMetaPayloads, DeleteNodesPayload, DocumentActionPayload, GotoPayload, MoveNodesPayload, RecoverSnapshotPayload, RemoveSlotPayload } from "../interfaces/payloads";
import { ID, IDesignerEngine, IXYCoord } from "../interfaces";
import { State } from "../reducers";
import { parseNodeSchema, paseNodes } from "../funcs/parseNodeSchema";
import { Store } from "redux";
import { ADD_NODES, BACKUP, CHANGE_NODE_META, CLEAR_CHANGED, DELETE_NODES, GOTO, INITIALIZE, MOVE_NODES, RECOVER_SNAPSHOT, REMOVE_DOCUMENT, REMOVE_SLOT } from "../actions/registry";
import { DocumentState } from "../reducers/documentsById/document";
import { isArr, isStr } from "@rxdrag/shared";
import { INodeSchema, INodeMeta, IViewSchema } from "@rxdrag/schema";

export class DocumentImpl implements IDocument {
  id: string;
  constructor(
    id: string | undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private engine: IDesignerEngine<any, any>,
    private store: Store<State>,
  ) {
    this.id = id || makeRxId()
    //this.initialize(meta)
  }

  initialize(meta: IViewSchema): void {
    const nodesById: NodesById = {}
    const root = parseNodeSchema(this.engine, this.id, meta.schema as INodeSchema, nodesById, false)
    this.dispatch({
      type: INITIALIZE,
      payload: {
        documentId: this.id,
        nodesById,
        title: meta.title,
        rootId: root.id,
      },
    })
    this.backup(HistoryableActionType.Default)
  }

  moveTo = (sourceId: string, targetId: string, pos: NodeRelativePosition): void => {
    const payload: MoveNodesPayload = {
      documentId: this.id,
      sourceIds: [sourceId],
      targetId,
      pos
    }
    this.dispatch(this.createAction(MOVE_NODES, payload))
  }
  multiMoveTo(sourceIds: string[], targetId: string, pos: NodeRelativePosition): void {
    throw new Error("Method not implemented.");
  }
  addNewNodes(elements: INodeSchema | INodeSchema[], targetId: string, pos: NodeRelativePosition): NodeChunk {
    const nodesChunk = paseNodes(this.engine, this.id, elements);
    this.receiveNodes(nodesChunk)
    const payload: AddNodesPayload = {
      documentId: this.id,
      nodes: nodesChunk,
      targetId,
      pos
    }
    this.dispatch(this.createAction(ADD_NODES, payload))

    return nodesChunk
  }

  addNewFreedomNodes(elements: INodeSchema<unknown, unknown> | INodeSchema<unknown, unknown>[], targetId: string, absolutePosition: IXYCoord): NodeChunk {
    const nodesChunk = paseNodes(this.engine, this.id, elements);
    const nodes = nodesChunk.nodesById
    if (absolutePosition) {
      for (const key of Object.keys(nodes)) {
        const node = nodes[key]
        if (node) {
          node.meta.props = {
            ...node.meta.props,
            left: absolutePosition?.x,
            top: absolutePosition?.y,
          }
        }
      }
    }

    this.receiveNodes(nodesChunk)
    const payload: AddNodesPayload = {
      documentId: this.id,
      nodes: nodesChunk,
      targetId,
      pos: NodeRelativePosition.InBottom
    }
    this.dispatch(this.createAction(ADD_NODES, payload))

    return nodesChunk
  }

  remove = (sourceId: string): void => {
    const payload: DeleteNodesPayload = {
      documentId: this.id,
      sourceIds: [sourceId],
    }
    this.dispatch(this.createAction(DELETE_NODES, payload))
    this.backup(HistoryableActionType.Remove)
  }

  removeSlot(id: string, name: string): void {
    const payload: RemoveSlotPayload = {
      documentId: this.id,
      nodeId: id,
      slotName: name,
    }
    this.dispatch(this.createAction(REMOVE_SLOT, payload))
    this.backup(HistoryableActionType.RemoveSlot)
  }

  addSlot(id: string, name: string): void {
    const node = this.getNode(id)
    if (node) {
      const comdesigner = this.engine.getComponentManager().getComponentConfig(node.meta.componentName)
      const slotConfig = comdesigner?.slots?.[name]
      let element: INodeSchema = { componentName: "DefaultSlot" }
      if (isStr(slotConfig)) {
        const slotElements = this.engine.getComponentManager().getComponentConfig(slotConfig)?.resource?.elements
        if (isArr(slotElements)) {
          element = slotElements[0]
        } else if (slotElements) {
          element = slotElements
        } else {
          console.warn("No set slot on name:", name)
          return
        }
      } else if (slotConfig === true || slotConfig === undefined) {
        element = { componentName: "DefaultSlot" }
      } else {
        const slotElement = isArr(slotConfig.resource?.elements) ? slotConfig.resource?.elements?.[0] : slotConfig.resource?.elements
        if (slotElement) {
          element = slotElement
        }
      }
      const nodes = paseNodes(this.engine, this.id, element);
      this.receiveNodes(nodes)
      const payload: AddNodesPayload = {
        documentId: this.id,
        nodes,
        targetId: node.id,
        slot: name,
      }
      this.dispatch(this.createAction(ADD_NODES, payload))
    } else {
      console.error("Can not find node by id", id)
    }
  }

  clone(sourceId: string): void {
    const sourceSchema = this.getNodeSchema(sourceId)
    if (sourceSchema) {
      const nodes = this.addNewNodes(sourceSchema, sourceId, NodeRelativePosition.After);
      for (const node of nodes.rootNodes) {
        this.engine.getActions().selectNodes([node.id])
      }
      this.backup(HistoryableActionType.Clone)
    }
  }

  changeNodeMeta(id: string, newMeta: INodeMeta): void {
    const payload: ChangeMetaPayloads = {
      documentId: this.id,
      id,
      meta: newMeta
    }
    this.engine.dispatch({ type: CHANGE_NODE_META, payload })
    this.backup(HistoryableActionType.Change)
  }

  clearChanged(): void {
    const payload: DocumentActionPayload = {
      documentId: this.id,
    }
    this.dispatch({ type: CLEAR_CHANGED, payload })
  }

  backup(actionType: HistoryableActionType): void {
    const historyLength = this.getState()?.history.length;
    const payload: BackupPayload = {
      documentId: this.id,
      nodes: this.engine.getMonitor().getState().nodesById,
      selectedIds: this.store.getState()?.selectedIds || [],
      actionType: actionType
    }

    this.engine.dispatch({ type: BACKUP, payload })
    const gotoPayload: GotoPayload = {
      documentId: this.id,
      index: historyLength || 0
    }
    this.engine.dispatch({ type: GOTO, payload: gotoPayload })

  }

  undo(): void {
    const state = this.getState()
    if (state?.snapshotIndex === 0) {
      return
    }
    if (state?.history.length) {
      const currentIndex = state?.snapshotIndex || (state?.history.length - 1)
      if (currentIndex > 0) {
        const snapshot = state.history[currentIndex - 1]
        if (snapshot) {
          this.recoverSnapshot(snapshot)
          this.dispatchGoto(currentIndex - 1)
        }
      }
    }
  }

  redo(): void {
    const state = this.getState()
    if (!state || state?.snapshotIndex === null) {
      return
    }

    const currentIndex = state.snapshotIndex
    if (currentIndex === state.history.length - 1) {
      return
    }
    const snapshot = state.history[currentIndex + 1]
    if (snapshot) {
      this.dispatchGoto(currentIndex + 1)
      this.recoverSnapshot(snapshot)
    }
  }

  goto(index: number): void {
    const state = this.getState()
    const snapshot = state?.history[index]
    if (snapshot) {
      this.recoverSnapshot(snapshot)
    }
    this.dispatchGoto(index)
  }

  getRootNode(): ITreeNode | null {
    const documentState = this.getState()
    const state = this.store.getState()
    return documentState?.rootId ? (state.nodesById[documentState?.rootId || ""] || null) : null
  }
  getNode = (id: string): ITreeNode | null => {
    const state = this.store.getState()
    return state?.nodesById?.[id] || null
  }

  destroy(): void {
    const ids = this.engine.getMonitor().getDocumentSelectedIds(this.id)
    if (ids?.length) {
      this.engine.getActions().selectNodes([])
    }
    this.dispatch(this.createAction(REMOVE_DOCUMENT, {}))
  }

  getSchemaTree(): INodeSchema | null {
    return this.getNodeSchema(this.getState()?.rootId || "")
  }

  getTitle(): string | undefined {
    return this.getState()?.title
  }

  dispatch(action: IDocumentAction<any>): void {
    this.engine.dispatch(action)
  }

  public createAction(actionType: string, payload: any): IDocumentAction<DocumentActionPayload> {
    return {
      type: actionType,
      payload: {
        documentId: this.id,
        ...payload
      }
    }
  }

  private getNodeSchema(id: ID): INodeSchema | null {
    const node = this.getNode(id)
    const slots: { [name: string]: INodeSchema } = {}
    const children: INodeSchema[] = []
    for (const key of Object.keys(node?.slots || {})) {
      const slot = this.getNodeSchema(node?.slots?.[key] || "")
      if (slot) {
        slots[key] = slot
      } else {
        console.error("can not find slot")
      }
    }

    for (const childId of node?.children || []) {
      const child = this.getNodeSchema(childId)
      if (child) {
        children.push(child)
      } else {
        console.error("can not find child")
      }
    }
    if (node) {
      return {
        ...node.meta,
        slots,
        children
      }
    }

    return null
  }

  private receiveNodes(nodes: NodeChunk) {
    for (const key of Object.keys(nodes.nodesById)) {
      nodes.nodesById[key].documentId = this.id
    }
  }

  private dispatchGoto(index: number) {
    const payload: GotoPayload = {
      documentId: this.id,
      index: index
    }
    this.engine.dispatch({ type: GOTO, payload })
  }

  private getState(): DocumentState | undefined {
    return this.store.getState().documentsById[this.id]
  }


  private recoverSnapshot(snapshot: ISnapshot) {
    const payload: RecoverSnapshotPayload = {
      documentId: this.id,
      snapshot
    }
    this.engine.dispatch({ type: RECOVER_SNAPSHOT, payload })
  }
}
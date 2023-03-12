import { makeRxId } from "core/utils/make-rxId";
import { HistoryableActionType, IDocument, IDocumentAction, INodeMeta, INodeSchema, ISnapshot, ITreeNode, NodeChunk, NodeRelativePosition } from "../interfaces/document";
import { AddNodesPayload, BackupPayload, ChangeMetaPayloads, DeleteNodesPayload, DocumentActionPayload, GotoPayload, MoveNodesPayload, RecoverSnapshotPayload, RemoveSlotPayload } from "../interfaces/payloads";
import { ID, IDesignerEngine } from "core/interfaces";
import { State } from "core/reducers";
import { parseNodeSchema, paseNodes } from "core/funcs/parseNodeSchema";
import { Store } from "redux";
import { ADD_NODES, BACKUP, CHANGE_NODE_META, DELETE_NODES, GOTO, INITIALIZE, MOVE_NODES, RECOVER_SNAPSHOT, REMOVE_DOCUMENT, REMOVE_SLOT } from "core/actions/registry";
import { DocumentState } from "core/reducers/documentsById/document";
import { NodesById } from "core/reducers/nodesById";
import { isArr, isStr } from "core/utils/types";

export class DocumentImpl implements IDocument {
  id: string;
  constructor(schema: INodeSchema,
    private engine: IDesignerEngine,
    private store: Store<State>
  ) {
    this.id = makeRxId()
    this.initialize(schema, this.id)
  }

  initialize(rootSchema: INodeSchema, documentId: string): void {
    const nodesById: NodesById = {}
    if (!this.isBlocksSchema(rootSchema)) {
      const root = parseNodeSchema(this.engine, documentId, rootSchema as INodeSchema, nodesById, false)
      this.dispatch({
        type: INITIALIZE,
        payload: {
          documentId: documentId,
          nodesById,
          rootId: root.id,
        },
      })
      this.backup(HistoryableActionType.Default)
    }
  }
  moveTo = (sourceId: string, targetId: string, pos: NodeRelativePosition): void => {
    const playload: MoveNodesPayload = {
      documentId: this.id,
      sourceIds: [sourceId],
      targetId,
      pos
    }
    this.dispatch(this.createAction(MOVE_NODES, playload))
  }
  multiMoveTo(sourceIds: string[], targetId: string, pos: NodeRelativePosition): void {
    throw new Error("Method not implemented.");
  }
  addNewNodes(elements: INodeSchema | INodeSchema[], targetId: string, pos: NodeRelativePosition): NodeChunk {
    const nodes = paseNodes(this.engine, this.id, elements);
    this.receiveNodes(nodes)
    const playload: AddNodesPayload = {
      documentId: this.id,
      nodes,
      targetId,
      pos
    }
    this.dispatch(this.createAction(ADD_NODES, playload))

    return nodes
  }

  remove = (sourceId: string): void => {
    const playload: DeleteNodesPayload = {
      documentId: this.id,
      sourceIds: [sourceId],
    }
    this.dispatch(this.createAction(DELETE_NODES, playload))
    this.backup(HistoryableActionType.Remove)
  }

  removeSlot(id: string, name: string): void {
    const playload: RemoveSlotPayload = {
      documentId: this.id,
      nodeId: id,
      slotName: name,
    }
    this.dispatch(this.createAction(REMOVE_SLOT, playload))
    this.backup(HistoryableActionType.RemoveSlot)
  }

  addSlot(id: string, name: string): void {
    const node = this.getNode(id)
    if (node) {
      const comdesigner = this.engine.getComponentManager().getComponentDesigner(node.meta.componentName)
      const slotConfig = comdesigner?.slots?.[name]
      let element: INodeSchema = { componentName: "DefaultSlot" }
      if (isStr(slotConfig)) {
        const slotElements = this.engine.getComponentManager().getComponentDesigner(slotConfig)?.resource?.elements
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
      const playload: AddNodesPayload = {
        documentId: this.id,
        nodes,
        targetId: node.id,
        slot: name,
      }
      this.dispatch(this.createAction(ADD_NODES, playload))
    } else {
      console.error("Can not find node by id", id)
    }
  }

  clone(sourceId: string): void {
    const sourceSchema = this.getNodeSchema(sourceId)
    if (sourceSchema) {
      const nodes = this.addNewNodes(sourceSchema, sourceId, NodeRelativePosition.After);
      for (const node of nodes.rootNodes) {
        this.engine.getActions().selectNodes([node.id], this.id)
      }
      this.backup(HistoryableActionType.Clone)
    }
  }

  changeNodeMeta(id: string, newMeta: INodeMeta): void {
    const payload: ChangeMetaPayloads = {
      id,
      meta: newMeta
    }
    this.engine.dispatch({ type: CHANGE_NODE_META, payload })
    this.backup(HistoryableActionType.Change)
  }

  backup(actionType: HistoryableActionType): void {
    const historyLength = this.getState()?.history.length;
    const payload: BackupPayload = {
      documentId: this.id,
      nodes: this.engine.getMonitor().getState().nodesById,
      selectedIds: this.getState()?.selectedIds || [],
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
          this.revoverSnapshot(snapshot)
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
      this.revoverSnapshot(snapshot)
    }
  }

  goto(index: number): void {
    const state = this.getState()
    const snapshot = state?.history[index]
    if (snapshot) {
      this.revoverSnapshot(snapshot)
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

  destory(): void {
    this.dispatch(this.createAction(REMOVE_DOCUMENT, { }))
  }

  getSchemaTree(): INodeSchema | null {
    return this.getNodeSchema(this.getState()?.rootId || "")
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

  private isBlocksSchema(schema: INodeSchema): boolean {
    return !(schema as INodeSchema).componentName
  }

  private revoverSnapshot(snapshot: ISnapshot) {
    const payload: RecoverSnapshotPayload = {
      documentId: this.id,
      snapshot
    }
    this.engine.dispatch({ type: RECOVER_SNAPSHOT, payload })
  }
}
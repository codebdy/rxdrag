import { IDesignerEngine, NodeType, Unsubscribe } from "../../../interfaces";
import { MouseClickEvent } from "../../../shell/events";
import { IPlugin } from "../../../interfaces/plugin";

//处理选中
export class SelectionControllerImpl implements IPlugin {
  name = "default.selection-controller";

  unsubscribe: Unsubscribe

  constructor(protected engine: IDesignerEngine) {
    this.unsubscribe = this.engine.getShell().subscribeTo<MouseClickEvent>(MouseClickEvent.Name, this.handleNodeClick)
  }

  handleNodeClick = (e: MouseClickEvent): void => {
    const monitor = this.engine.getMonitor()
    const { rxId, nodeType } = e.data.targetRx || {}
    if (rxId && nodeType === NodeType.Node) {
      const documentId = monitor.getNodeDocumentId(rxId)
      if (!documentId) {
        return
      }
      const selectedNodes = monitor.getDocumentSelectedIds(documentId)
      if (selectedNodes && selectedNodes.length === 1 && selectedNodes[0] === rxId) {
        return
      }
      //用于判断是否点中画布
      const node = this.engine.getMonitor().getNode(rxId)
      if (e.originalEvent.ctrlKey && node?.parentId) {
        const oldSelects = this.engine.getMonitor().getCurrentSelectedIds()
        const newSelects = oldSelects?.find(id => id === rxId) ? oldSelects.filter(id => id !== rxId) : [...oldSelects || [], rxId]
        this.engine.getActions().selectNodes(newSelects)
      } else {
        this.engine.getActions().selectNodes([rxId])
      }
    }
  }

  destroy(): void {
    this.unsubscribe()
  }

}

export const SelectionController = (engine: IDesignerEngine) => {
  return new SelectionControllerImpl(engine)
}
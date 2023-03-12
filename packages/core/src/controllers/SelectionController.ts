import { IDesignerEngine, NodeType, Unsubscribe } from "core";
import { MouseClickEvent } from "core/shell/events";
import { IPlugin } from "core/interfaces/plugin";

export class SelectionControllerImpl implements IPlugin {
  name: string = "default.selection-controller";

  unsucribe: Unsubscribe
  
  constructor(protected engine: IDesignerEngine) {
    this.unsucribe = this.engine.getShell().subscribeTo(MouseClickEvent, this.handleNodeClick)
  }

  handleNodeClick = (e: MouseClickEvent): void => {
    const monitor = this.engine.getMonitor()
    const { rxId, nodeType } = e.data.targetRx || {}
    if (rxId && nodeType === NodeType.Node) {
      const documentId = monitor.getNodeDocumentId(rxId)
      if(!documentId){
        return
      }
      const selectedNodes = monitor.getDocumentSelectedIds(documentId)
      if (selectedNodes && selectedNodes.length === 1 && selectedNodes[0] === rxId) {
        return
      }
      this.engine.getActions().selectNodes([rxId], documentId)
    }
  }

  destory(): void {
    this.unsucribe()
  }

}

export const SelectionController = (engine:IDesignerEngine)=>{
  return new SelectionControllerImpl(engine)
}
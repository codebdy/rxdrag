import { IDesignerEngine, NodeType, Unsubscribe } from "../interfaces";
import { MouseClickEvent } from "../shell/events";
import { IPlugin } from "../interfaces/plugin";

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

  destroy(): void {
    this.unsubscribe()
  }

}

export const SelectionController = (engine:IDesignerEngine)=>{
  return new SelectionControllerImpl(engine)
}
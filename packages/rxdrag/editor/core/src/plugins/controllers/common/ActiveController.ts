import { IDesignerEngine, NodeType, Unsubscribe } from "../../../interfaces";
import { IPlugin } from "../../../interfaces/plugin";
import { MouseOutEvent } from "../../../shell/events/mouse/MouseOutEvent";
import { MouseOverEvent } from "../../../shell/events/mouse/MouseOverEvent";

export class ActiveControllerImpl implements IPlugin {
  name = "default.active-controller";
  private unover: Unsubscribe
  private unout: Unsubscribe

  constructor(protected engine: IDesignerEngine) {
    this.unover = engine.getShell().subscribeTo<MouseOverEvent>(MouseOverEvent.Name, this.handleOverNode)
    this.unout = engine.getShell().subscribeTo<MouseOutEvent>(MouseOutEvent.Name, this.handleOutNode)
  }

  handleOverNode = (e: MouseOverEvent): void => {
    const { rxId, nodeType } = e.data.targetRx || {}
    if (rxId && nodeType === NodeType.Node) {
      this.engine.getActions().activeNode(rxId)
    }
  }

  handleOutNode = (e: MouseOutEvent): void => {
    this.engine.getActions().activeNode(null)
  }

  destroy(): void {
    this.unover()
    this.unout()
  }

}

export const ActiveController = (engine: IDesignerEngine) => {
  return new ActiveControllerImpl(engine)
}
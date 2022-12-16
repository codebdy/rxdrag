import { IDesignerEngine, NodeType, Unsubscribe } from "core";
import { IPlugin } from "core/interfaces/plugin";
import { MouseOutEvent } from "core/shell/events/mouse/MouseOutEvent";
import { MouseOverEvent } from "core/shell/events/mouse/MouseOverEvent";

export class ActiveControllerImpl implements IPlugin {
  name: string = "default.active-controller";
  private unover: Unsubscribe
  private unout: Unsubscribe

  constructor(protected engine: IDesignerEngine) {
    this.unover = engine.getShell().subscribeTo(MouseOverEvent, this.handleOverNode)
    this.unout = engine.getShell().subscribeTo(MouseOutEvent, this.handleOutNode)
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

  destory(): void {
    this.unover()
    this.unout()
  }

}

export const ActiveController = (engine: IDesignerEngine) => {
  return new ActiveControllerImpl(engine)
}
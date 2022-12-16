import { IDesignerEngine, ITreeNode } from "core/interfaces";
import { AbstractButton } from "./AbstractButton";

export class MoveButton extends AbstractButton {
  constructor(protected engine: IDesignerEngine) {
    super("default.move-button", engine)
  }
  onRender(node: ITreeNode): HTMLElement | null {
    const behavior = this.engine.getNodeBehavior(node.id)
    if(!behavior.isDraggable()){
      return null
    }
    const htmlEl = this.createHtmlElement()
    htmlEl.innerHTML = `
    <svg style="width:16px;height:16px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M13,11H18L16.5,9.5L17.92,8.08L21.84,12L17.92,15.92L16.5,14.5L18,13H13V18L14.5,16.5L15.92,17.92L12,21.84L8.08,17.92L9.5,16.5L11,18V13H6L7.5,14.5L6.08,15.92L2.16,12L6.08,8.08L7.5,9.5L6,11H11V6L9.5,7.5L8.08,6.08L12,2.16L15.92,6.08L14.5,7.5L13,6V11Z" />
    </svg>
    `
    htmlEl.style.cursor = "move"
    return htmlEl
  }
}
import { IDesignerEngine, ITreeNode } from "../../../../../interfaces";
import { AbstractButton } from "./AbstractButton";

export class CloneButton extends AbstractButton {
  constructor(protected engine: IDesignerEngine) {
    super("default.clone-button", engine)
  }

  handleClone = () => {
    const node = this.engine.getMonitor().getCurrentNode()
    if (node) {
      const doc = this.engine.getNodeDocument(node.id)
      if (doc) {
        doc.clone(node.id)
      }
    }
  }

  onRender(node: ITreeNode): HTMLElement | null {
    const behavior = this.engine.getBehaviorManager().getNodeBehavior(node.id)
    if (!behavior.cloneable() || node.isSlot) {
      this.teardown()
      return null
    }
    const htmlEl = this.createHtmlElement()
    htmlEl.innerHTML = `
    <svg style="width:13px;height:13px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
    </svg>
    `
    htmlEl.addEventListener("click", this.handleClone)
    return htmlEl
  }

  teardown(): void {
    if (this.htmlElement) {
      this.htmlElement.removeEventListener("click", this.handleClone)
    }
    super.teardown()
  }
}
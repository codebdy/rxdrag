import { IDesignerEngine, ITreeNode } from "../../../../../interfaces";
import { AbstractButton } from "./AbstractButton";

export class DeleteButton extends AbstractButton {
  constructor(protected engine: IDesignerEngine) {
    super("default.delete-button", engine)
  }

  handleRemove = () => {
    const node = this.engine.getMonitor().getCurrentNode()
    if (node) {
      const doc = this.engine.getNodeDocument(node.id)
      if (doc) {
        doc.remove(node.id)
      }
    }
  }

  onRender(node: ITreeNode): HTMLElement | null {
    const behavior = this.engine.getBehaviorManager().getNodeBehavior(node.id)
    if (!behavior.deletable() || node.isSlot) {
      this.teardown()
      return null
    }
    const htmlEl = this.createHtmlElement()
    htmlEl.innerHTML = `
    <svg style="width:16px;height:16px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
    </svg>
    `
    htmlEl.addEventListener("click", this.handleRemove)
    return htmlEl
  }

  teardown(): void {
    if (this.htmlElement) {
      this.htmlElement.removeEventListener("click", this.handleRemove)
    }
    super.teardown()
  }
}
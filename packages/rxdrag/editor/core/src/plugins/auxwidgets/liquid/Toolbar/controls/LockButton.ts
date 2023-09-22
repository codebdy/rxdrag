import { IDesignerEngine, ITreeNode } from "../../../../../interfaces";
import { AbstractButton } from "./AbstractButton";

const lockIcon = `
<svg style="width:13px;height:13px" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" ><path d="M512 768c-17.664 0-32-14.304-32-32l0-96c0-17.696 14.336-32 32-32s32 14.304 32 32l0 96C544 753.696 529.664 768 512 768z"></path><path d="M832 960 192 960c-52.928 0-96-43.072-96-96L96 512c0-52.928 43.072-96 96-96l640 0c52.928 0 96 43.072 96 96l0 352C928 916.928 884.928 960 832 960zM192 480c-17.632 0-32 14.368-32 32l0 352c0 17.664 14.368 32 32 32l640 0c17.664 0 32-14.336 32-32L864 512c0-17.632-14.336-32-32-32L192 480z"></path><path d="M736 480c-17.696 0-32-14.336-32-32L704 318.016C704 209.248 601.76 128 510.336 128 416.768 128 320 198.912 320 317.568L320 448c0 17.664-14.336 32-32 32s-32-14.336-32-32L256 317.568C256 158.848 385.312 64 510.336 64 632.224 64 768 168.32 768 318.016L768 448C768 465.664 753.696 480 736 480z"></path></svg>
`
const unlockIcon = `
<svg style="width:13px;height:13px" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M785.066667 416H381.866667v-121.6c0-74.666667 61.866667-134.4 138.666666-134.4 59.733333 0 113.066667 36.266667 132.266667 91.733333 6.4 17.066667 23.466667 25.6 40.533333 19.2 17.066667-6.4 25.6-23.466667 19.2-40.533333-27.733333-81.066667-104.533333-134.4-192-134.4-110.933333 0-202.666667 89.6-202.666666 198.4v121.6h-78.933334c-55.466667 0-100.266667 44.8-100.266666 100.266667v311.466666c0 55.466667 44.8 100.266667 100.266666 100.266667h546.133334c55.466667 0 100.266667-44.8 100.266666-100.266667V516.266667c0-55.466667-44.8-100.266667-100.266666-100.266667z m36.266666 411.733333c0 19.2-17.066667 36.266667-36.266666 36.266667H238.933333c-19.2 0-36.266667-17.066667-36.266666-36.266667V516.266667c0-19.2 17.066667-36.266667 36.266666-36.266667h546.133334c19.2 0 36.266667 17.066667 36.266666 36.266667v311.466666z"></path><path d="M512 544c-17.066667 0-32 14.933333-32 32v106.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-106.666667c0-17.066667-14.933333-32-32-32z"></path></svg>
`

export class LockButton extends AbstractButton {
  htmlEl?: HTMLElement
  locked?: boolean
  constructor(protected engine: IDesignerEngine) {
    super("default.lock-button", engine)

  }

  handleLock = () => {
    const node = this.engine.getMonitor().getCurrentNode()
    if (node && this.htmlEl) {
      const doc = this.engine.getNodeDocument(node.id)
      this.locked = !this.locked
      doc?.changeNodeMeta(node.id, { ...node.meta, locked: this.locked })
      this.htmlEl.innerHTML = this.locked ? unlockIcon : lockIcon
    }
  }

  onRender(node: ITreeNode): HTMLElement | null {
    const behavior = this.engine.getBehaviorManager().getNodeBehavior(node.id)
    if (!behavior.lockable()) {
      this.teardown()
      return null
    }
    this.locked = node.meta.locked
    const htmlEl = this.createHtmlElement()
    htmlEl.innerHTML = node.meta.locked ? unlockIcon : lockIcon
    htmlEl.addEventListener("click", this.handleLock)
    this.htmlEl = htmlEl
    return htmlEl
  }

  teardown(): void {
    if (this.htmlElement) {
      this.htmlElement.removeEventListener("click", this.handleLock)
    }
    super.teardown()
  }
}
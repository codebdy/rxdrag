import { numbToPx } from "../utils/numbToPx";
import { IDesignerEngine, IDesignerShell, Unsubscribe } from "../../interfaces";
import { AcceptType } from "../../interfaces/action";
import { IPlugin } from "../../interfaces/plugin";
import { DragOverState } from "../../reducers/dragOver";
import { addZIndex } from "../../utils/add-zindex";
import { RelativePosition } from "../../utils/coordinate";

//提示光标
export class InsertionCursorImpl implements IPlugin {
  name = "default.insertion";
  htmlCoverNode: HTMLElement;
  htmlCursorNode: HTMLElement;
  detachDragover: Unsubscribe
  shell: IDesignerShell

  constructor(private engine: IDesignerEngine) {
    this.shell = engine.getShell()
    // const container = this.shell.getContainer()
    // if (!container) {
    //   console.error("Html 5 driver rootElement is undefined")
    // }
    const htmlNode = document.createElement('div')
    htmlNode.style.position = "fixed"
    htmlNode.style.display = "none"
    htmlNode.style.pointerEvents = "none"
    htmlNode.style.opacity = "0.1"
    this.htmlCoverNode = htmlNode

    const htmlCursorNode = document.createElement('div')
    htmlCursorNode.style.position = "fixed"
    htmlCursorNode.style.display = "none"
    htmlCursorNode.style.pointerEvents = "none"
    this.htmlCursorNode = htmlCursorNode

    this.detachDragover = this.engine.getMonitor().subscribeToDragOver(this.handleDragOver)
  }

  handleDragOver = (dragover: DragOverState) => {
    const canvas = this.shell.getCanvas(this.engine.getMonitor().getNodeDocumentId(dragover?.targetId || "") || "")
    if (dragover) {
      if (dragover?.position === "in") {
        if (!canvas?.contains(this.htmlCoverNode)) {
          canvas?.appendAux(this.htmlCoverNode)
        }
        this.renderCover(dragover)
        this.htmlCursorNode.style.display = "none"
      } else {
        if (!canvas?.contains(this.htmlCursorNode)) {
          canvas?.appendAux(this.htmlCursorNode)
        }
        this.renderCursor(dragover)
        this.htmlCoverNode.style.display = "none"
      }
    } else {
      this.htmlCursorNode.style.display = "none"
      this.htmlCoverNode.style.display = "none"
    }
  }

  private renderCover = (dragover: DragOverState) => {
    const rect = this.engine.getShell().getTopRect(dragover?.targetId || "")

    if (rect) {
      if (dragover?.type === AcceptType.Reject) {
        this.htmlCoverNode.style.backgroundColor = "red"
      } else {
        this.htmlCoverNode.style.backgroundColor = "blue"
      }

      this.htmlCoverNode.style.display = "block"
      this.htmlCursorNode.style.zIndex = addZIndex(window.getComputedStyle(this.htmlCursorNode).zIndex, 1)
      this.htmlCoverNode.style.top = numbToPx(rect.y)
      this.htmlCoverNode.style.left = numbToPx(rect.x)
      this.htmlCoverNode.style.width = numbToPx(rect.width)
      this.htmlCoverNode.style.height = numbToPx(rect.height)
    }
  }

  private renderCursor = (dragover: DragOverState) => {
    const htmlDiv = this.engine.getShell().getElements(dragover?.targetId || "")
    const rect = this.engine.getShell().getTopRect(dragover?.targetId || "")
    if (rect && htmlDiv && dragover) {
      if (dragover.type === AcceptType.Accept) {
        this.htmlCursorNode.style.backgroundColor = "blue"
      } else {
        this.htmlCursorNode.style.backgroundColor = "red"
      }
      this.htmlCursorNode.style.display = "block"
      this.htmlCursorNode.style.zIndex = "2";//addZIndex(window.getComputedStyle(htmlDiv).zIndex, 2)
      if (dragover.position === RelativePosition.Bottom) {
        this.htmlCursorNode.style.top = numbToPx(rect.y + rect.height)
        this.htmlCursorNode.style.left = numbToPx(rect.x)
        this.htmlCursorNode.style.width = numbToPx(rect.width)
        this.htmlCursorNode.style.height = "2px"
      }
      if (dragover.position === RelativePosition.Top) {
        this.htmlCursorNode.style.top = numbToPx(rect.y)
        this.htmlCursorNode.style.left = numbToPx(rect.x)
        this.htmlCursorNode.style.width = numbToPx(rect.width)
        this.htmlCursorNode.style.height = "2px"
      }
      if (dragover.position === RelativePosition.Left) {
        this.htmlCursorNode.style.top = numbToPx(rect.y)
        this.htmlCursorNode.style.left = numbToPx(rect.x)
        this.htmlCursorNode.style.width = "2px"
        this.htmlCursorNode.style.height = numbToPx(rect.height)
      }
      if (dragover.position === RelativePosition.Right) {
        this.htmlCursorNode.style.top = numbToPx(rect.y)
        this.htmlCursorNode.style.left = numbToPx(rect.x + rect.width)
        this.htmlCursorNode.style.width = "2px"
        this.htmlCursorNode.style.height = numbToPx(rect.height)
      }
    }
  }

  destroy(): void {
    this.detachDragover()
    this.htmlCoverNode.remove()
    this.htmlCursorNode.remove()
  }

}

export const InsertionCursor = (engine: IDesignerEngine) => {
  return new InsertionCursorImpl(engine)
}
import { HistoryableActionType, IDesignerEngine, IRect, ISize, ITreeNode } from "../../../../interfaces";
import { CornerHandler, Offset } from "./CornerHandler";
import { leftTopCursor } from "./cursors";
import { HandlerSize, leftTopBottomRightCursor, svgCursor } from "./utils";

export class LeftTopConner extends CornerHandler {
  constructor(protected nodes: (ITreeNode | undefined)[], protected rect: IRect, container: HTMLDivElement, protected engine: IDesignerEngine) {
    super(nodes, rect, container, engine)
    this.htmlElement.style.transform = "translate(-50%, -50%)"
    this.htmlElement.style.cursor = svgCursor(leftTopBottomRightCursor, "nw-resize")
    this.htmlElement.style.left = "0"
    this.htmlElement.style.top = "0"

    let rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = svgCursor(leftTopCursor, "default")
    rightRotate.style.width = HandlerSize * 2 + 'px'
    rightRotate.style.height = HandlerSize * 3 + 'px'
    rightRotate.style.left = "-1px"
    rightRotate.style.bottom = "-1px"
    rightRotate.style.transform = "translate(-100%, 0)"

    this.hemlElementInner.appendChild(rightRotate)

    rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = svgCursor(leftTopCursor, "default")
    rightRotate.style.width = HandlerSize * 3 + 'px'
    rightRotate.style.height = HandlerSize * 2 + 'px'
    rightRotate.style.right = "-1px"
    rightRotate.style.top = "-1px"
    rightRotate.style.transform = "translate(0, -100%)"
    this.hemlElementInner.appendChild(rightRotate)
  }

  protected onDragging(offset: Offset): void {
    if (!this.rotating && this.rect) {
      if (this.container.parentElement) {
        this.container.parentElement.style.width = Math.round(this.rect.width - offset.x) + "px"
        this.container.parentElement.style.height = Math.round(this.rect.height - offset.y) + "px"
        this.container.parentElement.style.top = Math.round(this.rect.y + offset.y) + "px"
        this.container.parentElement.style.left = Math.round(this.rect.x + offset.x) + "px"
      }
    }
  }

  protected onDrop(offset: Offset): void {
    if (!this.rotating && this.rect) {
      const doc = this.engine.getNodeDocument(this.nodes?.[0]?.id || "")
      if (doc) {
        const canvas = this.engine.getShell().getCanvas(doc.id)

        for (const node of this.nodes) {
          if (!node) {
            continue
          }
          const nodeRect = canvas?.getNodeRect(node.id)
          if (nodeRect) {
            const newMeta = {
              ...node.meta,
              props: {
                ...node.meta.props,
                ...this.getNewSize(nodeRect, offset),
                top: node.meta.props?.top as number + offset.y,
                left: node.meta.props?.left as number + offset.x,
              }
            }
            doc.changeNodeMeta(node.id, newMeta)
          }
        }
        doc.backup(HistoryableActionType.Resize)
      }
    }
  }

  protected getNewSize(old: ISize, offset: Offset): ISize {
    const newWidth = this.rect.width - offset.x
    const newHeight = this.rect.height - offset.y

    const widthScale = (newWidth < 0 ? 1 : newWidth) / this.rect.width
    const heightScale = (newHeight < 0 ? 1 : newHeight) / this.rect.height
    return {
      width: Math.round(old.width * widthScale),
      height: Math.round(old.height * heightScale),
    }
  }
}
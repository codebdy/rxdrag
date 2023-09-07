import { HistoryableActionType, IDesignerEngine, IRect, ISize, ITreeNode } from "../../../../interfaces";
import { CornerHandler, Offset } from "./CornerHandler";
import { rightBottomCursor } from "./cursors";
import { HandlerSize, leftTopBottomRightCursor, svgCursor } from "./utils";

export class RightBottomConner extends CornerHandler {
  constructor(protected nodes: (ITreeNode | undefined)[], protected rect: IRect, container: HTMLDivElement, protected engine: IDesignerEngine) {
    super(nodes, rect, container, engine)
    this.htmlElement.style.transform = "translate(50%, 50%)"
    this.htmlElement.style.cursor = svgCursor(leftTopBottomRightCursor, "nw-resize")
    this.htmlElement.style.right = "0"
    this.htmlElement.style.bottom = "0"

    let rotate = document.createElement('div')
    rotate.style.position = "absolute"
    rotate.style.cursor = svgCursor(rightBottomCursor, "default")
    rotate.style.width = HandlerSize * 2 + 'px'
    rotate.style.height = HandlerSize * 3 + 'px'
    rotate.style.right = "-1px"
    rotate.style.top = "0"
    rotate.style.transform = "translate(100%, 0)"

    this.hemlElementInner.appendChild(rotate)

    rotate = document.createElement('div')
    rotate.style.position = "absolute"
    rotate.style.cursor = svgCursor(rightBottomCursor, "default")
    rotate.style.width = HandlerSize * 3 + 'px'
    rotate.style.height = HandlerSize * 2 + 'px'
    rotate.style.left = "0"
    rotate.style.bottom = "-1px"
    rotate.style.transform = "translate(0, 100%)"
    this.hemlElementInner.appendChild(rotate)
  }

  protected onDragging(offset: Offset): void {
    if (!this.rotating && this.rect) {
      if (this.container.parentElement) {
        this.container.parentElement.style.width = Math.round(this.rect.width + offset.x) + "px"
        this.container.parentElement.style.height = Math.round(this.rect.height + offset.y) + "px"
      }

      //这个代码不行，跟下面的drop冲突，需要备份原始尺寸
      //   const doc = this.engine.getNodeDocument(this.nodes?.[0]?.id || "")
      //   if (doc) {
      //     const canvas = this.engine.getShell().getCanvas(doc.id)

      //     for (const node of this.nodes) {
      //       if (!node) {
      //         continue
      //       }
      //       const elements = canvas?.getElements(node.id)
      //       for (const el of elements || []) {
      //         const rect = el.getBoundingClientRect()
      //         const newSize = this.getNewSize(rect, offset)
      //         el.style.width = newSize.width + "px"
      //         el.style.height = newSize.height + "px"
      //       }
      //     }
      //   }
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
                ...this.getNewSize(nodeRect, offset)
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
    const newWidth = this.rect.width + offset.x
    const newHeight = this.rect.height + offset.y

    const widthScale = (newWidth < 0 ? 1 : newWidth) / this.rect.width
    const heightScale = (newHeight < 0 ? 1 : newHeight) / this.rect.height
    return {
      width: Math.round(old.width * widthScale),
      height: Math.round(old.height * heightScale),
    }
  }
}
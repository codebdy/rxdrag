import { HistoryableActionType, IDesignerEngine, IRect, ISize, ITreeNode, IXYCoord } from "../../../../interfaces"
import { AUX_BACKGROUND_COLOR } from "../../utils"
import { HandlerSize } from "./utils"

export type Offset = {
  x: number,
  y: number,
}

export interface IElementInfo {
  element: HTMLElement,
  rect: IRect,
}

export interface INodeInfo {
  node: ITreeNode,
  rect: IRect,
  elementInfos: IElementInfo[],
  children?: INodeInfo[]
}

export abstract class CornerHandler {
  protected htmlElement: HTMLElement
  protected htmlElementInner: HTMLElement
  protected startDrageEvent?: MouseEvent
  protected htmlRotate1: HTMLElement
  protected htmlRotate2: HTMLElement
  protected rotating?: boolean

  constructor(protected nodeInfos: (INodeInfo | undefined)[], protected rect: IRect, protected container: HTMLDivElement, protected engine: IDesignerEngine) {
    this.htmlElement = document.createElement('div')
    this.htmlElement.style.boxSizing = "border-box"
    this.htmlElement.style.pointerEvents = "all"
    this.htmlElement.style.position = "absolute"
    this.htmlElement.style.height = HandlerSize + "px"
    this.htmlElement.style.width = HandlerSize + "px"
    this.htmlElement.style.border = `solid 1px ${AUX_BACKGROUND_COLOR}`
    this.htmlElement.style.backgroundColor = "white"
    container.appendChild(this.htmlElement)

    this.htmlElementInner = document.createElement('div')
    this.htmlElementInner.style.position = "relative"
    this.htmlElementInner.style.height = '100%'
    this.htmlElementInner.style.width = '100%'

    this.htmlElement.appendChild(this.htmlElementInner)
    this.htmlElement.addEventListener("mousedown", this.handleMouseDown)
    this.container.ownerDocument.addEventListener("mouseup", this.handleMousUp)
    this.container.ownerDocument.addEventListener("mousemove", this.handleMousMove)

    let rotate = document.createElement('div')
    rotate.style.position = "absolute"
    this.htmlRotate1 = rotate
    this.htmlElementInner.appendChild(rotate)

    rotate = document.createElement('div')
    rotate.style.position = "absolute"
    this.htmlRotate2 = rotate

    this.htmlRotate1.addEventListener("mousedown", this.handleStartRotating)
    this.htmlRotate1.addEventListener("mousedown", this.handleStartRotating)
  }
  protected abstract getNewSize(old: ISize, offset: Offset): ISize
  protected abstract getNewPostition(old: IXYCoord, offset: Offset): IXYCoord

  destory() {
    this.htmlElement.removeEventListener("mousedown", this.handleMouseDown)
    this.container.ownerDocument.removeEventListener("mouseup", this.handleMousUp)
    this.container.ownerDocument.removeEventListener("mousemove", this.handleMousMove)
    this.htmlRotate1.removeEventListener("mousedown", this.handleStartRotating)
    this.htmlRotate1.removeEventListener("mousedown", this.handleStartRotating)
    this.htmlElement.remove()
  }

  protected onDragging(offset: Offset) {
    if (!this.rotating && this.rect) {
      if (this.container.parentElement) {
        const newSize = this.getNewSize(this.rect, offset)
        const newPos = this.getNewPostition(this.rect, offset)
        this.container.parentElement.style.width = (newSize.width) + "px"
        this.container.parentElement.style.height = (newSize.height) + "px"
        this.container.parentElement.style.top = newPos.y + "px"
        this.container.parentElement.style.left = newPos.x + "px"
      }

      for (const nodeInfo of this.nodeInfos) {
        if (nodeInfo) {
          this.draggingOne(nodeInfo, offset)
        }
      }
    }
  }

  private draggingOne(nodeInfo: INodeInfo, offset: Offset) {
    for (const eleInfo of nodeInfo.elementInfos) {
      const newSize = this.getNewSize(eleInfo.rect, offset)
      const newPos = this.getNewPostition(eleInfo.rect, offset)
      eleInfo.element.style.left = newPos.x + "px"
      eleInfo.element.style.top = newPos.y + "px"
      eleInfo.element.style.width = newSize.width + "px"
      eleInfo.element.style.height = newSize.height + "px"
    }
    for (const child of nodeInfo.children || []) {
      this.draggingOne(child, offset)
    }
  }

  protected onDrop(offset: Offset) {
    if (!this.rotating && this.rect) {
      const doc = this.getDocument()
      if (doc) {
        for (const nodeInfo of this.nodeInfos) {
          const node = nodeInfo?.node
          if (!node) {
            continue
          }
          const nodeRect = nodeInfo.rect
          if (nodeRect) {
            const newPos = this.getNewPostition(nodeRect, offset)
            const newMeta = {
              ...node.meta,
              props: {
                ...node.meta.props,
                ...this.getNewSize(nodeRect, offset),
                top: newPos.y,
                left: newPos.x,
              }
            }
            doc.changeNodeMeta(node.id, newMeta)
          }
        }
        doc.backup(HistoryableActionType.Resize)
      }
    }
  }

  protected handleStartRotating = () => {
    this.rotating = true
  }

  protected handleMouseDown = (e: MouseEvent) => {
    this.startDrageEvent = e
    this.container.ownerDocument.body.style.userSelect = "none"
  }

  protected handleMousUp = (e: MouseEvent) => {
    if (this.startDrageEvent) {
      this.onDrop(this.getOffset(e))
    }
    this.container.ownerDocument.body.style.userSelect = ""
    this.startDrageEvent = undefined
    this.rotating = false
  }

  protected handleMousMove = (e: MouseEvent) => {
    //如果鼠标左键不再被按下
    if (e.buttons === 0 && this.startDrageEvent) {
      this.handleMousUp(e)
      return
    }

    if (this.startDrageEvent) {
      this.onDragging(this.getOffset(e))
    }
  }

  protected handleBlockMouseDown(e: MouseEvent) {
    e.stopPropagation()
  }

  protected getOffset(e: MouseEvent): Offset {
    if (this.startDrageEvent) {
      return {
        x: e.screenX - this.startDrageEvent.screenX,
        y: e.screenY - this.startDrageEvent.screenY,
      }
    }
    return { x: 0, y: 0 }

  }

  protected getDocument() {
    return this.engine.getNodeDocument(this.nodeInfos?.[0]?.node.id || "")
  }
}
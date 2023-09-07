import { HistoryableActionType, IDesignerEngine, IRect, ISize, ITreeNode, IXYCoord } from "../../../../interfaces"
import { AUX_BACKGROUND_COLOR } from "../../utils"
import { HandlerSize } from "./utils"

export type Offset = {
  x: number,
  y: number,
}

export interface INodeInfo {
  node: ITreeNode,
  //是否组节点
  isGroup?: boolean,
  rect: IRect,
}

export abstract class CornerHandler {
  protected htmlElement: HTMLElement
  protected hemlElementInner: HTMLElement
  protected startDrageEvent?: MouseEvent
  protected rotating?: boolean

  constructor(protected nodeInfos: (INodeInfo | undefined)[], protected rect: IRect, protected container: HTMLDivElement, protected engine: IDesignerEngine) {
    this.htmlElement = document.createElement('div')
    this.htmlElement.style.pointerEvents = "all"
    this.htmlElement.style.position = "absolute"
    this.htmlElement.style.height = HandlerSize + "px"
    this.htmlElement.style.width = HandlerSize + "px"
    this.htmlElement.style.border = `solid 1px ${AUX_BACKGROUND_COLOR}`
    this.htmlElement.style.backgroundColor = "white"
    container.appendChild(this.htmlElement)

    this.hemlElementInner = document.createElement('div')
    this.hemlElementInner.style.position = "relative"
    this.hemlElementInner.style.height = '100%'
    this.hemlElementInner.style.width = '100%'

    this.htmlElement.appendChild(this.hemlElementInner)
    this.htmlElement.addEventListener("mousedown", this.handleMouseDown)
    this.container.ownerDocument.addEventListener("mouseup", this.handleMousUp)
    this.container.ownerDocument.addEventListener("mousemove", this.handleMousMove)
  }
  protected abstract getNewSize(old: ISize, offset: Offset): ISize
  protected abstract getNewPostition(old: IXYCoord, offset: Offset): IXYCoord

  destory() {
    this.htmlElement.removeEventListener("mousedown", this.handleMouseDown)
    this.container.ownerDocument.removeEventListener("mouseup", this.handleMousUp)
    this.container.ownerDocument.removeEventListener("mousemove", this.handleMousMove)
    this.htmlElement.remove()
  }

  protected onDragging(offset: Offset) {
    if (!this.rotating && this.rect) {
      if (this.container.parentElement) {
        const newSize = this.getNewSize(this.rect, offset)
        const newPos = this.getNewPostition(this.rect, offset)
        this.container.parentElement.style.width = newSize.width + "px"
        this.container.parentElement.style.height = newSize.height + "px"
        this.container.parentElement.style.top = newPos.y + "px"
        this.container.parentElement.style.left = newPos.x + "px"
      }
    }
  }

  protected onDrop(offset: Offset) {
    if (!this.rotating && this.rect) {
      const doc = this.getDocument()
      if (doc) {
        const canvas = this.engine.getShell().getCanvas(doc.id)

        for (const nodeInfo of this.nodeInfos) {
          const node = nodeInfo?.node
          if (!node) {
            continue
          }
          const nodeRect = canvas?.getNodeRect(node.id)
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

  protected handleMouseDown = (e: MouseEvent) => {
    this.startDrageEvent = e
    this.container.ownerDocument.body.style.userSelect = "none"
  }

  protected handleMousUp = (e: MouseEvent) => {
    console.log("====>handleMousUp", e)
    if (this.startDrageEvent) {
      this.onDrop(this.getOffset(e))
    }
    this.container.ownerDocument.body.style.userSelect = ""
    this.startDrageEvent = undefined
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

  protected getNodeRect(id: string) {
    return this.nodeInfos.find(info => info?.node.id === id)?.rect
  }
}
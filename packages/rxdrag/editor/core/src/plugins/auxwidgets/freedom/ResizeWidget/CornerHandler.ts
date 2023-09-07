import { IDesignerEngine, IRect, ITreeNode } from "../../../../interfaces"
import { AUX_BACKGROUND_COLOR } from "../../utils"
import { HandlerSize } from "./utils"

export type Offset = {
  x: number,
  y: number,
}

export abstract class CornerHandler {
  protected htmlElement: HTMLElement
  protected hemlElementInner: HTMLElement
  protected startDrageEvent?: MouseEvent
  protected rotating?: boolean

  constructor(protected nodes: (ITreeNode | undefined)[], protected rect: IRect, protected container: HTMLDivElement, protected engine: IDesignerEngine) {
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

  protected abstract onDragging(offset: Offset): void
  protected abstract onDrop(offset: Offset): void

  destory() {
    this.htmlElement.removeEventListener("mousedown", this.handleMouseDown)
    this.container.ownerDocument.removeEventListener("mouseup", this.handleMousUp)
    this.container.ownerDocument.removeEventListener("mousemove", this.handleMousMove)
    this.htmlElement.remove()
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

  // protected getNodeRect() {
  //   return this.engine.getShell().getCanvas(this.engine.getNodeDocument(this.node.id)?.id || "")?.getNodeRect(this.node.id) || undefined
  // }
}
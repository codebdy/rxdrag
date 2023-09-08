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
  //中心点坐标
  protected centerPoint?: IXYCoord
  private prevAngle = 0

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
    const oldDeg = this.getOldDeg()

    if (oldDeg && this.container.parentElement) {
      this.container.parentElement.style.transform = `rotate(${oldDeg}deg)`
    }
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

  protected onDragging(offset: Offset, deg?: number) {
    if (!this.rect) {
      return
    }
    if (!this.rotating) {
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
    } else {
      if (this.container.parentElement && this.nodeInfos?.length === 1) {
        this.container.parentElement.style.transform = `rotate(${deg}deg)`
      }
      for (const nodeInfo of this.nodeInfos) {
        if (nodeInfo) {
          this.rotatingOne(nodeInfo, deg)
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

  private rotatingOne(nodeInfo: INodeInfo, deg?: number) {
    if (deg) {
      for (const eleInfo of nodeInfo.elementInfos) {
        eleInfo.element.style.transform = `rotate(${this.getOldDeg() + deg}deg)`
      }
    }
  }

  protected onDropResize(offset: Offset) {
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

  protected onDropRotate(deg: number) {
    if (this.rotating && this.rect) {
      const doc = this.getDocument()
      if (doc) {
        for (const nodeInfo of this.nodeInfos) {
          const node = nodeInfo?.node
          if (!node) {
            continue
          }
          const nodeRect = nodeInfo.rect
          if (nodeRect) {
            const newMeta = {
              ...node.meta,
              props: {
                ...node.meta.props,
                rotateDeg: this.getNodeDeg(node) + deg,
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
    //中心点
    if (this.rect) {
      this.centerPoint = {
        x: this.rect.x + this.rect.width / 2,
        y: this.rect.y + this.rect.height / 2,
      }
    }
  }

  protected handleMouseDown = (e: MouseEvent) => {
    this.startDrageEvent = e
    this.container.ownerDocument.body.style.userSelect = "none"
  }

  protected handleMousUp = (e: MouseEvent) => {
    if (this.startDrageEvent) {
      if (this.rotating) {
        this.onDropRotate(this.getRotateDeg(e))
      } else {
        this.onDropResize(this.getOffset(e))
      }
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
      this.onDragging(this.getOffset(e), this.getRotateDeg(e))
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

  //如果只有一个元素返回角度
  protected getOldDeg() {
    if (this.nodeInfos.length === 1) {
      return (this.nodeInfos[0]?.node.meta.props?.rotateDeg as number | undefined) || 0
    }

    return 0
  }

  protected getNodeDeg(node: ITreeNode) {
    return (node.meta.props?.rotateDeg as number | undefined) || 0
  }

  private getRotateDeg(e: MouseEvent) {
    if (!this.centerPoint || !this.startDrageEvent) {
      return 0
    }
    
    const angleCurrent = this.computedAngle(this.centerPoint, { x: e.clientX, y: e.clientY });
    const angleStart = this.computedAngle(this.centerPoint, { x: this.startDrageEvent.clientX, y: this.startDrageEvent.clientY });
    let angle = angleCurrent - angleStart;
    const realAngle = angle += this.prevAngle;
    console.log("角度", realAngle)
    //this.currentAgle = realAngle
    //target.style.transform = `rotate(${realAngle}deg)`;
    return realAngle
  }

  private computedAngle(a: IXYCoord, b: IXYCoord) {
    const x = a.x - b.x
    const y = a.y - b.y;
    const result = 180 * Math.atan2(y, x) / Math.PI;
    return result;
  }
}


import { IDesignerEngine, IRect, ISize, IXYCoord } from "../../../../interfaces";
import { CornerHandler, INodeInfo, Offset } from "./CornerHandler";
import { leftTopCursor } from "./cursors";
import { HandlerSize, leftTopBottomRightCursor, svgCursor } from "./utils";

export class LeftTopConner extends CornerHandler {
  constructor(protected nodeInfos: (INodeInfo | undefined)[], protected rect: IRect, container: HTMLDivElement, protected engine: IDesignerEngine) {
    super(nodeInfos, rect, container, engine)
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getNewPostition(old: IXYCoord, offset: Offset): IXYCoord {
    return {
      ...old,
      x: old.x + + offset.x,
      y: old.y + + offset.y
    }
  }
}
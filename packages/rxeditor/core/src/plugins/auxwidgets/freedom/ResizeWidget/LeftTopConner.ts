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

    this.htmlRotate1.style.cursor = svgCursor(leftTopCursor, "default")
    this.htmlRotate1.style.width = HandlerSize * 2 + 'px'
    this.htmlRotate1.style.height = HandlerSize * 3 + 'px'
    this.htmlRotate1.style.left = "-6px"
    this.htmlRotate1.style.bottom = "-1px"
    this.htmlRotate1.style.transform = "translate(-100%, 0)"

    this.htmlRotate2.style.cursor = svgCursor(leftTopCursor, "default")
    this.htmlRotate2.style.width = HandlerSize * 3 + 'px'
    this.htmlRotate2.style.height = HandlerSize * 2 + 'px'
    this.htmlRotate2.style.right = "-1px"
    this.htmlRotate2.style.top = "-6px"
    this.htmlRotate2.style.transform = "translate(0, -100%)"
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
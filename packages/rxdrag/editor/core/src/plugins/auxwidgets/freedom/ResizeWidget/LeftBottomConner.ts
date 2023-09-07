import { IDesignerEngine, ITreeNode } from "../../../../interfaces";
import { CornerHandler, Offset } from "./CornerHandler";
import { leftBottomCursor } from "./cursors";
import { HandlerSize, leftBottomTopRightCursor, svgCursor } from "./utils";

export class LeftBottomConner extends CornerHandler {
  constructor(protected node: ITreeNode, container: HTMLDivElement, protected engine: IDesignerEngine) {
    super(node, container, engine)
    this.htmlElement.style.transform = "translate(-50%, 50%)"
    this.htmlElement.style.cursor = svgCursor(leftBottomTopRightCursor, "ne-resize")
    this.htmlElement.style.left = "0"
    this.htmlElement.style.bottom = "0"

    let rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = svgCursor(leftBottomCursor, "default")
    rightRotate.style.width = HandlerSize * 2 + 'px'
    rightRotate.style.height = HandlerSize * 3 + 'px'
    rightRotate.style.left = "-1px"
    rightRotate.style.top = "0"
    rightRotate.style.transform = "translate(-100%, 0)"

    this.hemlElementInner.appendChild(rightRotate)

    rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = svgCursor(leftBottomCursor, "default")
    rightRotate.style.width = HandlerSize * 3 + 'px'
    rightRotate.style.height = HandlerSize * 2 + 'px'
    rightRotate.style.right = "0"
    rightRotate.style.bottom = "-1px"
    rightRotate.style.transform = "translate(0, 100%)"
    this.hemlElementInner.appendChild(rightRotate)
  }

  protected onDragging(offset: Offset): void {
    throw new Error("Method not implemented.");
  }

  protected onDrop(offset: Offset): void {
    throw new Error("Method not implemented.");
  }

}
import { IDesignerEngine } from "../../../../interfaces";
import { CornerHandler } from "./CornerHandler";
import { HandlerSize } from "./consts";

const rotateCursor = `
`

export class RightTopConner extends CornerHandler {
  constructor(container: HTMLDivElement, protected engine: IDesignerEngine) {
    super(container, engine)
    this.htmlElement.style.transform = "translate(50%, -50%)"
    this.htmlElement.style.cursor = "ne-resize"
    this.htmlElement.style.right = "0"
    this.htmlElement.style.top = "0"

    let rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = "pointer"
    rightRotate.style.backgroundColor = "red"
    rightRotate.style.width = HandlerSize * 2 + 'px'
    rightRotate.style.height = HandlerSize * 3 + 'px'
    rightRotate.style.right = "-1px"
    rightRotate.style.bottom = "0"
    rightRotate.style.transform = "translate(100%, 0)"

    this.hemlElementInner.appendChild(rightRotate)

    rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = "pointer"
    rightRotate.style.backgroundColor = "red"
    rightRotate.style.width = HandlerSize * 3 + 'px'
    rightRotate.style.height = HandlerSize * 2 + 'px'
    rightRotate.style.left = "0"
    rightRotate.style.top = "-1px"
    rightRotate.style.transform = "translate(0, -100%)"
    this.hemlElementInner.appendChild(rightRotate)
  }
}
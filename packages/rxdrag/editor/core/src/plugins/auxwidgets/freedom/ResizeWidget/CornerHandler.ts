import { IDesignerEngine } from "../../../../interfaces"
import { AUX_BACKGROUND_COLOR } from "../../utils"
import { HandlerSize } from "./utils"

export class CornerHandler {
  protected htmlElement: HTMLElement
  protected hemlElementInner: HTMLElement
  constructor(protected container: HTMLDivElement, protected engine: IDesignerEngine) {
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
  }


  destory() {
    this.htmlElement.remove()
  }
}
import { IDesignerEngine } from "../../../../interfaces"
import { AUX_BACKGROUND_COLOR } from "../../utils"
import { HandlerHeight, HandlerWidth } from "./consts"

export class CornerHandler {
  protected htmlElement: HTMLElement
  constructor(protected container: HTMLDivElement, protected engine: IDesignerEngine) {
    this.htmlElement = document.createElement('div')
    this.htmlElement.style.pointerEvents = "all"
    this.htmlElement.style.position = "absolute"
    this.htmlElement.style.height = HandlerHeight
    this.htmlElement.style.width = HandlerWidth
    this.htmlElement.style.border = `solid 1px ${AUX_BACKGROUND_COLOR}`
    this.htmlElement.style.backgroundColor = "white"
    container.appendChild(this.htmlElement)
  }


  destory() {
    this.htmlElement.remove()
  } 
}
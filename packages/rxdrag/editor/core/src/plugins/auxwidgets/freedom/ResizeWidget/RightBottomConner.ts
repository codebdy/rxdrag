import { IDesignerEngine } from "../../../../interfaces";
import { CornerHandler } from "./CornerHandler";

export class RightBottomConner extends CornerHandler {
  constructor(container: HTMLDivElement, protected engine: IDesignerEngine) {
    super(container, engine)
    this.htmlElement.style.transform = "translate(50%, 50%)"
    this.htmlElement.style.cursor = "nw-resize"
    this.htmlElement.style.right = "0"
    this.htmlElement.style.bottom = "0"
  }
}
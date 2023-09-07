import { IDesignerEngine } from "../../../../interfaces";
import { CornerHandler } from "./CornerHandler";

export class RightTopConner extends CornerHandler {
  constructor(container: HTMLDivElement, protected engine: IDesignerEngine) {
    super(container, engine)
    this.htmlElement.style.transform = "translate(50%, -50%)"
    this.htmlElement.style.cursor = "ne-resize"
    this.htmlElement.style.right = "0"
    this.htmlElement.style.top = "0"
  }
}
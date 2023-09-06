import { IDesignerEngine, ITreeNode } from "../../../../../interfaces";
import { AUX_BACKGROUND_COLOR, AUX_COLOR, TOOLBAR_HEIGHT } from "../../../utils/constants";
import { IAuxControl } from "../interfaces";

export abstract class AbstractButton implements IAuxControl{
  protected htmlElement: HTMLElement | null = null
  constructor(public name:string, protected engine: IDesignerEngine){
  }

  abstract onRender(node: ITreeNode): HTMLElement | null

  selector (node: ITreeNode, engine?: IDesignerEngine | undefined){
    return true
  }

  teardown(): void {
    if (this.htmlElement) {
      this.htmlElement.remove()
    }
  }
  
  protected createHtmlElement(){
    if(this.htmlElement){
      this.htmlElement.remove()
    }
    const htmlDiv = document.createElement('div')
    htmlDiv.style.backgroundColor = AUX_BACKGROUND_COLOR
    htmlDiv.style.color = AUX_COLOR
    htmlDiv.style.borderRadius = "2px"
    htmlDiv.style.cursor = "pointer"
    htmlDiv.style.position = "relative"
    htmlDiv.style.display = "flex"
    htmlDiv.style.alignItems = "center"
    htmlDiv.style.justifyContent = "center"
    htmlDiv.style.marginLeft = "2px"
    htmlDiv.style.height = TOOLBAR_HEIGHT + "px"
    htmlDiv.style.width = TOOLBAR_HEIGHT + "px"
    htmlDiv.innerHTML = "?"
    this.htmlElement = htmlDiv
    return htmlDiv
  }
}
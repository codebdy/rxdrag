import { ID } from "@rxdrag/shared";
import { IDesignerEngine, ITreeNode } from "../../../../../interfaces";
import { AUX_BACKGROUND_COLOR, AUX_COLOR, TOOLBAR_HEIGHT } from "../../../utils/constants";
import { IAuxControl } from "../interfaces";

export class ComponentSelector implements IAuxControl {
  name = "default.component-selector";
  private htmlElement: HTMLElement
  private menuDiv: HTMLElement
  private items = 0
  constructor(protected engine: IDesignerEngine) {
    const htmlDiv = document.createElement('div')
    htmlDiv.style.backgroundColor = AUX_BACKGROUND_COLOR
    htmlDiv.style.color = AUX_COLOR
    htmlDiv.style.padding = "0 4px"
    htmlDiv.style.borderRadius = "2px"
    htmlDiv.style.cursor = "pointer"
    htmlDiv.style.position = "relative"
    htmlDiv.style.display = "flex"
    htmlDiv.style.alignItems = "center"
    htmlDiv.style.height = TOOLBAR_HEIGHT + "px"
    const menuDiv = document.createElement('div')
    menuDiv.style.position = "absolute"
    menuDiv.style.left = "0px"
    menuDiv.style.top = "100%"
    menuDiv.style.height = "0"
    menuDiv.style.overflow = "hidden"
    menuDiv.style.transition = "all 0.3s"
    this.menuDiv = menuDiv
    this.htmlElement = htmlDiv
    this.htmlElement.addEventListener("mouseenter", this.handleMouseEnter)
    this.htmlElement.addEventListener("mouseleave", this.handleMouseLeave)
  }
  selector(node: ITreeNode, engine?: IDesignerEngine | undefined) {
    return true
  }
  onRender(node: ITreeNode): HTMLElement | null {
    this.htmlElement.innerHTML = ` 
    <svg style="width:14px;height:14px;margin-right:2px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22,13.5C22,15.26 20.7,16.72 19,16.96V20A2,2 0 0,1 17,22H13.2V21.7A2.7,2.7 0 0,0 10.5,19C9,19 7.8,20.21 7.8,21.7V22H4A2,2 0 0,1 2,20V16.2H2.3C3.79,16.2 5,15 5,13.5C5,12 3.79,10.8 2.3,10.8H2V7A2,2 0 0,1 4,5H7.04C7.28,3.3 8.74,2 10.5,2C12.26,2 13.72,3.3 13.96,5H17A2,2 0 0,1 19,7V10.04C20.7,10.28 22,11.74 22,13.5M17,15H18.5A1.5,1.5 0 0,0 20,13.5A1.5,1.5 0 0,0 18.5,12H17V7H12V5.5A1.5,1.5 0 0,0 10.5,4A1.5,1.5 0 0,0 9,5.5V7H4V9.12C5.76,9.8 7,11.5 7,13.5C7,15.5 5.75,17.2 4,17.88V20H6.12C6.8,18.25 8.5,17 10.5,17C12.5,17 14.2,18.25 14.88,20H17V15Z" />
    </svg>
    ${node.title || node.meta.componentName} 
    `
    this.htmlElement.appendChild(this.menuDiv)
    this.menuDiv.innerHTML = ""
    this.items = 0
    node.parentId && this.createParentItem(node.parentId)
    return this.htmlElement
  }

  handleMouseEnter = () => {
    this.menuDiv.style.height = (this.items * (TOOLBAR_HEIGHT + 2)) + "px"
  }

  handleMouseLeave = () => {
    this.menuDiv.style.height = "0"
  }

  teardown(): void {
    this.htmlElement.removeEventListener("mouseenter", this.handleMouseEnter)
    if (this.htmlElement) {
      this.htmlElement.remove()
    }
  }

  private createParentItem(parentId: ID) {
    const parentNode = this.engine.getMonitor().getNode(parentId)
    this.items = this.items + 1
    const itemDiv = document.createElement('div')
    itemDiv.style.backgroundColor = AUX_BACKGROUND_COLOR
    itemDiv.style.marginTop = "2px"
    itemDiv.style.padding = "0px 4px"
    itemDiv.style.borderRadius = "2px"
    itemDiv.style.display = "flex"
    itemDiv.style.alignItems = "center"
    itemDiv.style.height = TOOLBAR_HEIGHT + "px"
    itemDiv.innerHTML = `
    <svg style="width:14px;height:14px;margin-right:2px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M8 3H16C18.76 3 21 5.24 21 8V16C21 18.76 18.76 21 16 21H8C5.24 21 3 18.76 3 16V8C3 5.24 5.24 3 8 3M8 5C6.34 5 5 6.34 5 8V16C5 17.66 6.34 19 8 19H16C17.66 19 19 17.66 19 16V8C19 6.34 17.66 5 16 5H8Z" />
    </svg>
    ${parentNode?.title || parentNode?.meta.componentName}
    `
    itemDiv.style.whiteSpace = "nowrap"
    itemDiv.addEventListener("click", ()=>{
      this.menuDiv.style.height = "0"
      parentNode && this.engine.getActions().selectNodes([parentId])
    })
    this.menuDiv.appendChild(itemDiv)

    parentNode?.parentId && this.createParentItem(parentNode.parentId)
  }
}
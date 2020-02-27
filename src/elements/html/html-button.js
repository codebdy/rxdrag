import {RXElement} from "../rxelement"


export class HTMLButton extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlButton'
    this.toolboxInfo.elementName = "Button"
    this.className = 'HTMLButton'


    this.meta.tag = 'button'
    this.label = "button"

  }

  make(){
    return new HTMLButton
  }
 
 
}

import {RXElement} from "../rxelement"
export class HTMLInput extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlInput'
    this.toolboxInfo.elementName = "Input"
    this.className = 'HTMLInput'

    this.meta.tag = 'input'
    this.label = "input"

  }

  make(){
    return new HTMLInput
  }
  
}

import {RXElement} from "../rxelement"
export class HTMLTextarea extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlTextarea'
    this.toolboxInfo.elementName = "Textarea"
    this.className = 'HTMLTextarea'

    this.meta.tag = 'textarea'
    this.label = "textarea"

  }

  make(){
    return new HTMLTextarea
  }
  
}

import {RXElement} from "../rxelement"

export class HTMLSpan extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlSpan'
    this.toolboxInfo.elementName = "Span"
    this.className = 'HTMLSpan'

    this.meta.tag = 'span'
    this.meta.innerHTML = "Span text ..."
    this.label = "span"

    this.becomeToTextfield()
  }

  make(){
    return new HTMLSpan
  }
  
}

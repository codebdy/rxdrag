import {RXElement} from "../rxelement"

export class HTMLStrong extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlStrong'
    this.toolboxInfo.elementName = "Strong"
    this.className = 'HTMLStrong'

    this.editMarginStyle = {}

    this.meta.tag = 'strong'
    this.meta.innerHTML = "Strong text ..."
    this.label = "strong"

    this.becomeToTextfield()
  }

  make(){
    return new HTMLStrong
  }
  
}

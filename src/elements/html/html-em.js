import {RXElement} from "../rxelement"

export class HTMLEm extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlEm'
    this.toolboxInfo.elementName = "Em"
    this.className = 'HTMLEm'

    this.editMarginStyle = {}

    this.meta.tag = 'em'
    this.meta.innerHTML = "Em text ..."
    this.label = "em"

    this.becomeToTextfield()
  }

  make(){
    return new HTMLEm
  }
  }

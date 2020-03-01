import {RXElement} from "../rxelement"

export class HTMLHr extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'hr'
    this.toolboxInfo.elementName = "Hr"
    this.className = 'HTMLHr'
    this.meta.tag = 'hr'
    this.label = "hr"
    this.acceptedChildren=[]
    this.setEditPadding('')
  }

  make(){
    return new HTMLHr
  }
}

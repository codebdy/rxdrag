import {RXElement} from "../rxelement"

export class HTMLIns extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlIns'
    this.toolboxInfo.elementName = "Ins"
    this.className = 'HTMLIns'

    this.editMarginStyle = {}

    this.meta.tag = 'ins'
    this.meta.innerHTML = "Ins text ..."
    this.label = "ins"

    this.becomeToTextfield()
  }

  make(){
    return new HTMLIns
  }
}

import {RXElement} from "../rxelement"

export class HTMLDel extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlDel'
    this.toolboxInfo.elementName = "Del"
    this.className = 'HTMLDel'

    this.editMarginStyle = {}

    this.meta.tag = 'del'
    this.meta.innerHTML = "Delete text ..."
    this.label = "del"

    this.becomeToTextfield()
  }

  make(){
    return new HTMLDel
  }
}

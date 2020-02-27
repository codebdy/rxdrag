import {RXElement} from "../rxelement"

export class HTMLMark extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlMark'
    this.toolboxInfo.elementName = "Mark"
    this.className = 'HTMLMark'

    this.editMarginStyle = {}

    this.meta.tag = 'mark'
    this.meta.innerHTML = "Hightlight text ..."
    this.label = "mark"

    this.becomeToTextfield()
  }

  make(){
    return new HTMLMark
  }
}

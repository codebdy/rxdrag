import {RXElement} from "../rxelement"

export class HTMLS extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlS'
    this.toolboxInfo.elementName = "S"
    this.className = 'HTMLS'

    this.editMarginStyle = {}

    this.meta.tag = 's'
    this.meta.innerHTML = "S text ..."
    this.label = "s"

    this.becomeToTextfield()
  }

  make(){
    return new HTMLS
  }
  
}

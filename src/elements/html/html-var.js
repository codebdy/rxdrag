import {RXElement} from "../rxelement"

export class HTMLVar extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlVar'
    this.toolboxInfo.elementName = "Var"
    this.className = 'HTMLVar'

    this.editMarginStyle = {}

    this.meta.tag = 'var'
    this.meta.innerHTML = "Var text ..."
    this.label = "var"

    this.becomeToTextfield()
  }

  make(){
    return new HTMLVar
  }
  
}

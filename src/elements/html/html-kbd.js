import {RXElement} from "../rxelement"

export class HTMLKbd extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlKbd'
    this.toolboxInfo.elementName = "Kbd"
    this.className = 'HTMLKbd'

    this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Kbd Options'
    //}
    this.meta.tag = 'kbd'
    this.meta.innerHTML = "Kbd text ..."
    this.label = "kbd"

    this.becomeToTextfield()
  }

  make(){
    return new HTMLKbd
  }
}

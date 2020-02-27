import {RXElement} from "../rxelement"

export class HTMLCite extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlCite'
    this.toolboxInfo.elementName = "Cite"
    this.className = 'HTMLCite'

    this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Cite Options'
    //}
    this.meta.tag = 'cite'
    this.meta.innerHTML = "Cite text ..."
    this.label = "cite"

    this.becomeToTextfield()
  }

  make(){
    return new HTMLCite
  }
  
}

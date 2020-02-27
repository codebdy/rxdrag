import {RXElement} from "../rxelement"

export class HTMLTbody extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlTbody'
    this.toolboxInfo.elementName = "tbody"
    this.className = 'HTMLTbody'

    this.editMarginStyle.padding = ''
    this.meta.tag = 'tbody'
    this.label = "tbody"
    this.acceptedChildren=['HTMLTr']
    
  }

  make(){
    return new HTMLTbody
  }
}

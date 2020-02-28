import {RXElement} from "../rxelement"

export class HTMLLabel extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlLabel'
    this.toolboxInfo.elementName = "Label"
    this.className = 'HTMLLabel'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']
    this.meta.tag = 'label'
    this.label = "label"
  }

  make(){
    return new HTMLLabel
  }
}

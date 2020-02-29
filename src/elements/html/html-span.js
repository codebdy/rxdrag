import {RXElement} from "../rxelement"

export class HTMLSpan extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlSpan'
    this.toolboxInfo.elementName = "Span"
    this.className = 'HTMLSpan'

    this.meta.tag = 'span'
    this.meta.innerHTML = "Span"
    this.label = "span"

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']
  }

  make(){
    return new HTMLSpan
  }
  
}

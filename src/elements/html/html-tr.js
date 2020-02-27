import {RXElement} from "../rxelement"
import scopeSchema from "../schemas/table/scope"
import contextualSchema from "../schemas/table/contextual"

export class HTMLTr extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlTr'
    this.toolboxInfo.elementName = "tr"
    this.className = 'HTMLTr'

    this.editMarginStyle.padding = ''
    //this.editMarginStyle = {}

    this.unshiftGroup({
      id:'trOptions',
      label:'Tr Options',
    })

    this.meta.tag = 'tr'
    this.label = "tr"
    this.acceptedChildren=['HTMLTd', 'HTMLTh']
    
    this.addSchema(scopeSchema, 'trOptions')
    this.addSchema(contextualSchema, 'trOptions')
  }

  make(){
    return new HTMLTr
  }
}

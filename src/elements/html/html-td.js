import {RXElement} from "../rxelement"
import contextualSchema from "../schemas/table/contextual"

export class HTMLTd extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlTd'
    this.toolboxInfo.elementName = "td"
    this.className = 'HTMLTd'

    this.editMarginStyle.padding = '10px'
    //this.editMarginStyle = {}

    this.unshiftGroup({
      id:'tdOptions',
      label:'Td Options',
    })

    this.meta.tag = 'td'
    this.label = "td"
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.becomeToTextfield()
    this.addSchema(contextualSchema, 'tdOptions')
  }

  make(){
    return new HTMLTd
  }

}

import {RXElement} from "../rxelement"
import contextualSchema from "../schemas/table/contextual"

export class HTMLTh extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlTh'
    this.toolboxInfo.elementName = "th"
    this.className = 'HTMLTh'

    //this.editMarginStyle.padding = ''
    this.editMarginStyle = {}

    this.unshiftGroup({
      id:'thOptions',
      label:'Th Options',
    })

    this.meta.tag = 'th'
    this.meta.innerHTML = "TH text ..."
    this.label = "th"
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol', 'HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.becomeToTextfield()
    this.addSchema(contextualSchema, 'tdOptions')
  }

  make(){
    return new HTMLTh
  }

}

import {RXElement} from "../rxelement"
import headColorSchema from "../schemas/table/head-color"

export class HTMLThead extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlThead'
    this.toolboxInfo.elementName = "thead"
    this.className = 'HTMLThead'

    this.editMarginStyle.padding = ''

    this.unshiftGroup({
      id:'theadOptions',
      label:'Thead Options',
    })
    this.meta.tag = 'thead'
    this.label = "thead"
    this.acceptedChildren=['HTMLTr']
    
    this.addSchema(headColorSchema, 'theadOptions')
  }

  make(){
    return new HTMLThead
  }
}

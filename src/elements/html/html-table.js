import {RXElement} from "../rxelement"
import contextualSchema from "../schemas/table/contextual"
import stripedSchema from "../schemas/table/striped"
import borderSchema from "../schemas/table/border"
import hoverSchema from "../schemas/table/hover"
import responsiveSchema from "../schemas/table/responsive"
import smallSchema from "../schemas/table/small"

export class HTMLTable extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlTable'
    this.toolboxInfo.elementName = "table"
    this.className = 'HTMLTable'

    this.unshiftGroup({
      id:'tableOptions',
      label:'Table Options',
    })


    this.meta.tag = 'table'
    this.label = "table"
    this.acceptedChildren=['HTMLThead', 'HTMLTbody', 'HTMLTr','HTMLCaption']

    this.addSchema(contextualSchema, 'tableOptions')
    this.addSchema(stripedSchema, 'tableOptions')
    this.addSchema(borderSchema, 'tableOptions')
    this.addSchema(hoverSchema, 'tableOptions')
    this.addSchema(responsiveSchema, 'tableOptions')
    this.addSchema(smallSchema, 'tableOptions')
  }

  make(){
    return new HTMLTable
  }
}

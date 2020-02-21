import {RXElement} from "../rxelement"
import {addonTableContextual} from "../schemas/table/contextual"
//import {addonTypyListInline} from "../schemas/content/list-inline"

export class HTMLTable extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlTable'
    this.toolboxInfo.elementName = "table"
    this.className = 'HTMLTable'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    this.groups.tableOptions = {
      label:'Table Options'
    }
    this.$meta.tag = 'table'
    this.label = "table"
    this.acceptedChildren=['HTMLThead', 'HTMLTbody', 'HTMLTr','HTMLCaption']

    addonTableContextual(this)
  }

  make(){
    return new HTMLTable
  }
}

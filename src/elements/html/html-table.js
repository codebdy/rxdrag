import {RXElement} from "../rxelement"
import {addonTableContextual} from "../schemas/table/contextual"
import {addonTableStriped} from "../schemas/table/striped"
import {addonTableBorder} from "../schemas/table/border"
import {addonTableHover} from "../schemas/table/hover"
import {addonTableResponsive} from "../schemas/table/responsive"

import {addonUtilColor} from "../schemas/utilities/color"
import {addonUtilText} from "../schemas/utilities/text"

export class HTMLTable extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlTable'
    this.toolboxInfo.elementName = "table"
    this.className = 'HTMLTable'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    this.unshiftGroup({
      id:'tableOptions',
      label:'Table Options',
    })

    this.$meta.tag = 'table'
    this.label = "table"
    this.acceptedChildren=['HTMLThead', 'HTMLTbody', 'HTMLTr','HTMLCaption']

    /*addonTableContextual(this)
    addonTableStriped(this)
    addonTableBorder(this)
    addonTableHover(this)
    addonTableResponsive(this)
    addonUtilColor(this)
    addonUtilText(this)*/
  }

  make(){
    return new HTMLTable
  }
}

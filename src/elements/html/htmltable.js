import {RXElement} from "../rxelement"
//import {addonTypyListUnstyled} from "../schemas/content/list-unstyled"
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

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'table'
    this.label = "table"
    this.acceptedChildren=['HTMLThead', 'HTMLTbody', 'HTMLTr','HTMLCaption']
  }

  make(){
    return new HTMLTable
  }
}

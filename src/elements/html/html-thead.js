import {RXElement} from "../rxelement"
import {addonTheadColor} from "../schemas/table/head-color"
//import {addonTypyListInline} from "../schemas/content/list-inline"

export class HTMLThead extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlThead'
    this.toolboxInfo.elementName = "thead"
    this.className = 'HTMLThead'

    this.editMarginStyle.padding = ''
    //this.editMarginStyle = {}

    this.unshiftGroup({
      id:'theadOptions',
      label:'Thead Options',
    })
    this.$meta.tag = 'thead'
    this.label = "thead"
    this.acceptedChildren=['HTMLTr']
    
    //addonTheadColor(this)
  }

  make(){
    return new HTMLThead
  }
}

import {RXElement} from "../rxelement"
import {addonTrScope} from "../schemas/table/scope"
import {addonTableContextual} from "../schemas/table/contextual"
//import {addonTypyListInline} from "../schemas/content/list-inline"

export class HTMLTr extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlTr'
    this.toolboxInfo.elementName = "tr"
    this.className = 'HTMLTr'

    this.editMarginStyle.padding = ''
    //this.editMarginStyle = {}

    this.groups.trOptions = {
      label:'Tr Options'
    }
    this.$meta.tag = 'tr'
    this.label = "tr"
    this.acceptedChildren=['HTMLTr']
    
    addonTrScope(this)
    addonTableContextual(this, 'trOptions')
  }

  make(){
    return new HTMLTr
  }
}

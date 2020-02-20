import {RXElement} from "../rxelement"
//import {addonTypyListUnstyled} from "../schemas/content/list-unstyled"
//import {addonTypyListInline} from "../schemas/content/list-inline"

export class HTMLThead extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlThead'
    this.toolboxInfo.elementName = "thead"
    this.className = 'HTMLThead'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'thead'
    this.label = "thead"
    this.acceptedChildren=['HTMLTr']
    
  }

  make(){
    return new HTMLThead
  }
}

import {RXElement} from "../rxelement"
//import {addonTypyListUnstyled} from "../schemas/content/list-unstyled"
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

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'tr'
    this.label = "tr"
    this.acceptedChildren=['HTMLTr']
    
  }

  make(){
    return new HTMLTr
  }
}

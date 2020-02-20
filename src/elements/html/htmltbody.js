import {RXElement} from "../rxelement"
//import {addonTypyListUnstyled} from "../schemas/content/list-unstyled"
//import {addonTypyListInline} from "../schemas/content/list-inline"

export class HTMLTbody extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlTbody'
    this.toolboxInfo.elementName = "tbody"
    this.className = 'HTMLTbody'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'tbody'
    this.label = "tbody"
    this.acceptedChildren=['HTMLTr']
    
  }

  make(){
    return new HTMLTbody
  }
}

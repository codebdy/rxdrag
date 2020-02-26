import {RXElement} from "../rxelement"
import {addonTypyListUnstyled} from "../schemas/content/list-unstyled"
import {addonTypyListInline} from "../schemas/content/list-inline"

export class HTMLUl extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlUL'
    this.toolboxInfo.elementName = "ul"
    this.className = 'HTMLUl'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'ul'
    this.label = "ul"
    this.acceptedChildren=['HTMLLi']
    
    //addonTypyListUnstyled(this)
    //addonTypyListInline(this)
  }

  make(){
    return new HTMLUl
  }
}

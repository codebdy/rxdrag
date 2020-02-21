import {RXElement} from "../rxelement"
import {addonTypyListUnstyled} from "../schemas/content/list-unstyled"
import {addonTypyListInline} from "../schemas/content/list-inline"

export class HTMLOl extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlOl'
    this.toolboxInfo.elementName = "Ol"
    this.className = 'HTMLOl'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'ol'
    this.label = "ol"
    this.acceptedChildren=['HTMLLi']
    
    addonTypyListUnstyled(this)
    addonTypyListInline(this)
  }

  make(){
    return new HTMLOl
  }
}

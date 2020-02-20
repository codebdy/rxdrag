import {RXElement} from "../rxelement"
import {addonUtilBorder} from "../schemas/utilities/border"
import {addonUtilPadding} from "../schemas/utilities/padding"
import {addonUtilMargin} from "../schemas/utilities/margin"

export class HTMLSource extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlSource'
    this.toolboxInfo.elementName = "Source"
    this.className = 'HTMLSource'


    //this.groups.paragraphOptions = {
    //  label:'Source Options'
    //}
    this.$meta.tag = 'source'
    this.label = "Source"

    addonUtilBorder(this)
    addonUtilMargin(this)
    addonUtilPadding(this)
  }

  make(){
    return new HTMLSource
  }
  
}

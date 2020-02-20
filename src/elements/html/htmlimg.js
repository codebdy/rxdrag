import {RXElement} from "../rxelement"
import {addonUtilBorder} from "../schemas/utilities/border"
import {addonUtilPadding} from "../schemas/utilities/padding"
import {addonUtilMargin} from "../schemas/utilities/margin"

export class HTMLImg extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlImg'
    this.toolboxInfo.elementName = "Img"
    this.className = 'HTMLImg'


    //this.groups.paragraphOptions = {
    //  label:'Img Options'
    //}
    this.$meta.tag = 'img'
    this.label = "Img"

    addonUtilBorder(this)
    addonUtilMargin(this)
    addonUtilPadding(this)
  }

  make(){
    return new HTMLImg
  }
  
}

import {RXElement} from "../rxelement"
import {addonUtilBorder} from "../schemas/utilities/border"
import {addonUtilPadding} from "../schemas/utilities/padding"
import {addonUtilMargin} from "../schemas/utilities/margin"

export class HTMLPicture extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlPicture'
    this.toolboxInfo.elementName = "Picture"
    this.className = 'HTMLPicture'


    this.meta.tag = 'picture'
    this.label = "picture"

  }

  make(){
    return new HTMLPicture
  }
}

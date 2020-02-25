import {RXElement} from "../rxelement"
import {addonImageSrcset} from "../schemas/image/srcset"
import {addonImageSrcType} from "../schemas/image/srctype"

export class HTMLSource extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlSource'
    this.toolboxInfo.elementName = "Source"
    this.className = 'HTMLSource'


    this.groups.sourceOptions = {
      label:'Source Options'
    }
    this.$meta.tag = 'source'
    this.label = "source"

    addonImageSrcset(this)
    addonImageSrcType(this)
  }

  make(){
    return new HTMLSource
  }
  
}
